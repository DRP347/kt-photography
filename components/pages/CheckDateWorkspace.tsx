"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type BookingMode = "call" | "enquiry";
type FormErrors = Partial<Record<"coupleNames" | "phone" | "dateStatus" | "weddingDate" | "cityVenue" | "events", string>>;

const eventOptions = ["Pre-wedding", "Haldi", "Mehendi", "Sangeet", "Wedding", "Reception", "Other"];

function parseMode(search = ""): BookingMode {
  const value = new URLSearchParams(search).get("mode");
  return value === "call" ? "call" : "enquiry";
}

export function CheckDateWorkspace() {
  const [mode, setMode] = useState<BookingMode>("enquiry");
  const [dateStatus, setDateStatus] = useState<"known" | "not-finalised">("known");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");

  const calUrl = useMemo(() => {
    if (!siteConfig.calcomLink) return "";
    return siteConfig.calcomLink.startsWith("http")
      ? siteConfig.calcomLink
      : `https://cal.com/${siteConfig.calcomLink.replace(/^\/+/, "")}`;
  }, []);

  useEffect(() => {
    const syncMode = () => setMode(parseMode(window.location.search));
    syncMode();
    window.addEventListener("popstate", syncMode);
    return () => window.removeEventListener("popstate", syncMode);
  }, []);

  function selectMode(nextMode: BookingMode) {
    setMode(nextMode);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", nextMode);
    window.history.pushState(null, "", url.toString());
  }

  function toggleEvent(eventName: string) {
    setSelectedEvents((current) =>
      current.includes(eventName)
        ? current.filter((item) => item !== eventName)
        : [...current, eventName]
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors: FormErrors = {};

    const coupleNames = String(formData.get("coupleNames") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const weddingDate = String(formData.get("weddingDate") || "").trim();
    const cityVenue = String(formData.get("cityVenue") || "").trim();
    const details = String(formData.get("details") || "").trim();

    if (!coupleNames) nextErrors.coupleNames = "Please share the couple names.";
    if (!phone) nextErrors.phone = "Please share a reachable phone number.";
    if (phone && phone.replace(/[^\d]/g, "").length < 8) {
      nextErrors.phone = "Enter a reachable phone or WhatsApp number.";
    }
    if (dateStatus === "known" && !weddingDate) {
      nextErrors.weddingDate = "Share the date, or choose date not finalised.";
    }
    if (!cityVenue) nextErrors.cityVenue = "Please share the city or venue.";
    if (selectedEvents.length === 0) nextErrors.events = "Choose at least one event.";

    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length > 0) return;

    const dateLine = dateStatus === "not-finalised" ? "Date not finalised" : weddingDate;
    const message = [
      "Hello KT Photography,",
      "",
      `Couple names: ${coupleNames}`,
      `Phone: ${phone}`,
      `Wedding date: ${dateLine}`,
      `City / venue: ${cityVenue}`,
      `Events: ${selectedEvents.join(", ")}`,
      `Anything we should know: ${details || "Not shared"}`
    ].join("\n");

    const phoneNumber = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
    if (!phoneNumber) {
      setNotice("WhatsApp is not configured yet. Please use email for now.");
      return;
    }

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setNotice("WhatsApp opened with your details. Please review the message and press Send there.");
  }

  return (
    <section className="check-date-workspace" aria-labelledby="check-date-title">
      <div className="check-date-workspace__shell">
        <aside className="check-date-workspace__intro">
          <p className="type-kicker">Check your date</p>
          <h1 id="check-date-title">
            <span>Choose how</span>
            {" "}
            <span>you&apos;d like to begin.</span>
          </h1>
          <p>
            Share the essentials now, or choose a conversation time if you would rather talk through the day first.
          </p>

          <div className="check-date-modes" role="tablist" aria-label="Booking mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "call"}
              aria-controls="check-date-call"
              className={mode === "call" ? "is-active" : ""}
              onClick={() => selectMode("call")}
            >
              <span>01</span>
              <strong>Choose a time</strong>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "enquiry"}
              aria-controls="check-date-enquiry"
              className={mode === "enquiry" ? "is-active" : ""}
              onClick={() => selectMode("enquiry")}
            >
              <span>02</span>
              <strong>Send wedding details</strong>
            </button>
          </div>
        </aside>

        <div className="check-date-workspace__panel">
          {mode === "call" ? (
            <div id="check-date-call" role="tabpanel" className="check-date-call">
              <div className="check-date-panel-heading">
                <p className="type-kicker">Choose a time</p>
                <h2>Pick a calm window for a first conversation.</h2>
              </div>
              {calUrl ? (
                <>
                  <iframe title="Choose a time with KT Photography" src={calUrl} loading="lazy" />
                  <a href={calUrl} target="_blank" rel="noreferrer" className="editorial-link type-cta">
                    <span>Open calendar</span>
                  </a>
                </>
              ) : (
                <div className="check-date-empty">
                  <p>Calendar booking is not configured yet.</p>
                  <button type="button" className="editorial-link type-cta" onClick={() => selectMode("enquiry")}>
                    <span>Send wedding details</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form id="check-date-enquiry" role="tabpanel" className="check-date-form" onSubmit={onSubmit} noValidate>
              <div className="check-date-panel-heading">
                <p className="type-kicker">Send wedding details</p>
                <h2>Start with the details that shape the day.</h2>
              </div>

              {Object.keys(errors).length > 0 ? (
                <p className="check-date-form__alert" role="alert">
                  Please check the highlighted fields before opening WhatsApp.
                </p>
              ) : null}

              <Field label="Couple names" id="coupleNames" error={errors.coupleNames} required>
                <input id="coupleNames" name="coupleNames" autoComplete="name" aria-invalid={Boolean(errors.coupleNames)} />
              </Field>
              <Field label="Phone number" id="phone" error={errors.phone} required>
                <input id="phone" name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
              </Field>

              <fieldset className="check-date-choice">
                <legend>Wedding date <span aria-hidden="true">*</span></legend>
                <label>
                  <input
                    type="radio"
                    name="dateStatus"
                    value="known"
                    checked={dateStatus === "known"}
                    onChange={() => setDateStatus("known")}
                  />
                  <span>Date known</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="dateStatus"
                    value="not-finalised"
                    checked={dateStatus === "not-finalised"}
                    onChange={() => setDateStatus("not-finalised")}
                  />
                  <span>Date not finalised</span>
                </label>
                {dateStatus === "known" ? (
                  <>
                    <input
                      name="weddingDate"
                      type="text"
                      placeholder="Date or date range"
                      aria-invalid={Boolean(errors.weddingDate)}
                    />
                    {errors.weddingDate ? <p>{errors.weddingDate}</p> : null}
                  </>
                ) : null}
              </fieldset>

              <Field label="City or venue" id="cityVenue" error={errors.cityVenue} required>
                <input id="cityVenue" name="cityVenue" aria-invalid={Boolean(errors.cityVenue)} />
              </Field>

              <fieldset className="check-date-events">
                <legend>Events <span aria-hidden="true">*</span></legend>
                <div>
                  {eventOptions.map((eventName) => (
                    <label key={eventName}>
                      <input
                        type="checkbox"
                        name="events"
                        value={eventName}
                        checked={selectedEvents.includes(eventName)}
                        onChange={() => toggleEvent(eventName)}
                      />
                      <span>{eventName}</span>
                    </label>
                  ))}
                </div>
                {errors.events ? <p>{errors.events}</p> : null}
              </fieldset>

              <Field label="Anything we should know?" id="details">
                <textarea id="details" name="details" rows={4} />
              </Field>

              <div className="check-date-form__submit">
                <button type="submit" className="quiet-button">Continue to WhatsApp</button>
                <p>
                  We use these details only to respond to your enquiry. Read the{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </p>
                <p aria-live="polite">{notice}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  children,
  error,
  required
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="check-date-field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? <p>{error}</p> : null}
    </div>
  );
}
