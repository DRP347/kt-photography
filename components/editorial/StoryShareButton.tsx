"use client";

type StoryShareButtonProps = {
  title: string;
};

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.6 12.6 15.4 16" />
      <path d="M15.4 8 8.6 11.4" />
      <circle cx="6.7" cy="12" r="2.2" />
      <circle cx="17.3" cy="6.9" r="2.2" />
      <circle cx="17.3" cy="17.1" r="2.2" />
    </svg>
  );
}

export function StoryShareButton({ title }: StoryShareButtonProps) {
  return (
    <button
      type="button"
      className="story-share"
      aria-label="Share this story"
      onClick={async () => {
        const shareData = {
          title,
          url: window.location.href
        };

        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch {
            // User cancelled the native share sheet.
          }
          return;
        }

        try {
          await navigator.clipboard.writeText(window.location.href);
        } catch {
          // Clipboard can be blocked in some browsers; the visible button remains harmless.
        }
      }}
    >
      <ShareIcon />
      <span>Share this story</span>
    </button>
  );
}
