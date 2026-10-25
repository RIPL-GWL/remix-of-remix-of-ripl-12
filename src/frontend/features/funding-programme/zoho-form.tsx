import { useEffect, useRef, useState } from "react";

export const SUMMIT_REGISTRATION_URL =
  "https://forms.zohopublic.in/RIPLSTORES/form/StartupIdeaRegistrationForm/formperma/1SNzTjiKwSF14T0BCEyJLvZCZDDowZl3NYWbAjpy1KE";

const FORM_PERMA = "1SNzTjiKwSF14T0BCEyJLvZCZDDowZl3NYWbAjpy1KE";

/**
 * Official Zoho Forms embed: iframe with auto-resize via postMessage.
 * Reimplements the snippet Zoho provides so the form height tracks its content.
 */
export function ZohoRegistrationForm() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  // The referrer is browser-only, so build the form address after hydration to keep server and client markup identical.
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    setSrc(`${SUMMIT_REGISTRATION_URL}?zf_rszfm=1&referrername=${encodeURIComponent(window.location.href.slice(0, 1800))}`);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (typeof data !== "string") return;
      const parts = data.split("|");
      if (parts.length !== 2 && parts.length !== 3) return;
      const [perma, height] = parts;
      const frame = frameRef.current;
      if (!perma || !height || !frame || !frame.src.includes("formperma") || !frame.src.includes(perma)) return;
      const nextHeight = `${parseInt(height, 10) + 15}px`;
      if (parts.length === 3) frame.scrollIntoView();
      if (frame.style.height !== nextHeight) frame.style.height = nextHeight;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!src) return <div className="programme-registration-frame" style={{ height: 2383 }} aria-hidden="true" />;

  return (
    <iframe
      ref={frameRef}
      className="programme-registration-frame"
      src={src}
      title="Startup & Idea Registration Form"
      loading="lazy"
      style={{ height: 2383 }}
    />
  );
}
