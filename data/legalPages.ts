export type LegalSection = {
  id: string;
  title: string;
  body: string[];
  list?: string[];
};

export const legalLastUpdated = "15 July 2026";

export const termsSections: LegalSection[] = [
  {
    id: "about",
    title: "1. About these terms",
    body: [
      "These Website Terms & Conditions explain how visitors may use this KT Photography website. They cover browsing the portfolio, reading information, watching films and sending an enquiry.",
      "They do not replace a signed photography or filmmaking proposal, quotation or client agreement. A booking is confirmed only through a separate written agreement or written confirmation from KT Photography."
    ]
  },
  {
    id: "identity",
    title: "2. KT Photography",
    body: [
      "KT Photography is presented on this website as a Daman-based wedding photography and filmmaking studio working across India. The repository verifies the brand name, founder name, public contact links and service focus, but does not verify a full registered office address or tax registration details."
    ]
  },
  {
    id: "enquiries",
    title: "3. Enquiries and quotations",
    body: [
      "Submitting the Check Date form, opening WhatsApp, sending email or using a contact link is an enquiry request. It does not reserve a wedding date and does not create a client contract.",
      "Pricing, retainers, payment schedule, taxes, travel, accommodation, cancellation, rescheduling, raw-file access, delivery timelines and archive duration should be governed by the written quotation, proposal or service agreement issued for the assignment."
    ]
  },
  {
    id: "portfolio",
    title: "4. Portfolio and information use",
    body: [
      "Photographs, films, text, graphics, logos and page layouts on this website are provided for portfolio and information purposes. Visitors may not scrape, copy, republish, sell or commercially reuse the website content without written permission.",
      "Wedding photographs and films should be displayed only with appropriate permission or contractual consent. Publication-right confirmation remains an owner review item for production readiness."
    ]
  },
  {
    id: "client-cooperation",
    title: "5. Event access and third parties",
    body: [
      "Actual photography and filmmaking work depends on client cooperation, venue access, event schedules, permissions, safety restrictions and third-party rules. These operational details should be handled in the separate client agreement for each event."
    ]
  },
  {
    id: "creative-discretion",
    title: "6. Creative discretion",
    body: [
      "The website presents KT Photography as a documentary and editorial wedding photography and filmmaking service. Final image selection, editing style and film construction are creative services and should be governed by the specific written agreement with the client."
    ]
  },
  {
    id: "third-party-links",
    title: "7. Third-party links and embedded media",
    body: [
      "The website links to third-party services such as Instagram, YouTube, WhatsApp and email. Those services are controlled by their own providers and may apply their own terms and privacy practices.",
      "YouTube films are loaded through a click-to-play facade, so the active YouTube player is not loaded until a visitor chooses to play a film."
    ]
  },
  {
    id: "availability",
    title: "8. Website availability and changes",
    body: [
      "KT Photography may update website pages, portfolio selections, contact links and these terms from time to time. The website may be unavailable during maintenance or due to hosting, network or third-party service issues."
    ]
  },
  {
    id: "liability",
    title: "9. Liability",
    body: [
      "The website is provided for general portfolio and enquiry use. Nothing on the website should be treated as a guaranteed service outcome, confirmed booking, legal advice or tax advice.",
      "Any limitation of liability, indemnity, governing law and jurisdiction for paid assignments should be reviewed and confirmed in the separate client agreement and by a qualified Indian lawyer."
    ]
  },
  {
    id: "contact",
    title: "10. Contact and review",
    body: [
      "Questions about these terms can be sent through the contact methods shown on the website. This page is a website draft prepared for production review and should be checked by the owner and legal counsel before final legal reliance."
    ]
  }
];

export const privacySections: LegalSection[] = [
  {
    id: "controller",
    title: "1. Who controls the data",
    body: [
      "KT Photography controls the personal information submitted through this website and its linked contact channels. The repository verifies the public email, phone, WhatsApp, Instagram and YouTube contact paths used by the site."
    ]
  },
  {
    id: "collected",
    title: "2. Information collected directly",
    body: [
      "The Check Date form asks for couple names, phone number, wedding date or date status, city or venue, selected event types and optional details. The form opens WhatsApp with a prepared message, so visitors can review the message before sending it.",
      "Email, WhatsApp, Instagram and YouTube interactions may collect whatever information the visitor chooses to send through those services."
    ]
  },
  {
    id: "automatic",
    title: "3. Information collected automatically",
    body: [
      "The site may create ordinary server and hosting logs such as request URL, IP address, browser information and timestamps. No Google Analytics, advertising pixel or tag manager integration is present in the current codebase.",
      "Cloudinary may deliver production media after the migration is complete. YouTube is not loaded as an active player until a visitor chooses to play a film."
    ]
  },
  {
    id: "use",
    title: "4. How information is used",
    body: [
      "Information is used to respond to enquiries, understand the requested date and event scope, prepare quotations, communicate about services, keep the website secure and maintain the website experience.",
      "The website does not create an account, shopping cart, subscription or public user posting area."
    ]
  },
  {
    id: "providers",
    title: "5. Service providers and international processing",
    body: [
      "The website and its linked services may involve hosting, email, WhatsApp, Instagram, YouTube and Cloudinary infrastructure. These providers may process data outside India depending on their systems and visitor location.",
      "KT Photography should confirm its full operational provider list before final publication."
    ]
  },
  {
    id: "retention",
    title: "6. Retention and security",
    body: [
      "The repository does not verify a fixed retention schedule for enquiries, contracts, delivered galleries or archived media. Retention should be based on enquiry handling, service delivery, legal obligations and owner-confirmed business practice.",
      "Reasonable care should be used to protect personal information, but no website or communication channel can be guaranteed perfectly secure."
    ]
  },
  {
    id: "rights",
    title: "7. Access, correction and deletion",
    body: [
      "Visitors may request access, correction or deletion of personal information by contacting KT Photography through the public contact methods. Some records may need to be retained where required for legal, accounting, security or contractual reasons."
    ]
  },
  {
    id: "children",
    title: "8. Children and wedding media",
    body: [
      "The website is intended for adults making wedding or event enquiries. Wedding photographs or films may include guests and family members; publication rights and consent should be confirmed through owner materials and client agreements."
    ]
  },
  {
    id: "changes",
    title: "9. Changes and contact",
    body: [
      "This Privacy Policy may be updated as the website technology or business practice changes. Questions can be sent through the public contact methods shown on the site."
    ]
  }
];

export const cookieSections: LegalSection[] = [
  {
    id: "summary",
    title: "1. Current cookie decision",
    body: [
      "The current codebase does not include analytics, advertising pixels, tag manager scripts or a first-party cookie consent banner. The site uses a click-to-load YouTube facade, so active YouTube embeds are loaded only after a visitor chooses to play a film.",
      "Because no non-essential tracker is intentionally loaded before user action, a noisy consent banner is not implemented in this pass."
    ]
  },
  {
    id: "necessary",
    title: "2. Strictly necessary technology",
    body: [
      "The website may rely on hosting, image delivery, CSS, JavaScript and security-related server logs to make pages load and remain secure. These are treated as necessary for the website to function."
    ]
  },
  {
    id: "media",
    title: "3. Embedded media",
    body: [
      "Film posters may be requested from YouTube's image domain. The active privacy-enhanced YouTube player is loaded only when a visitor presses play. Once loaded, YouTube may process data under its own terms and privacy practices."
    ]
  },
  {
    id: "preferences",
    title: "4. Preferences and analytics",
    body: [
      "No site preference storage, analytics cookies or marketing cookies are intentionally created in the current implementation. If analytics, advertising, scheduling embeds or preference storage are added later, this policy and the consent decision should be updated first."
    ]
  },
  {
    id: "controls",
    title: "5. Browser controls and contact",
    body: [
      "Visitors can use browser settings to block or delete cookies and site storage. Questions about cookies and similar technology can be sent through KT Photography's public contact methods."
    ]
  }
];
