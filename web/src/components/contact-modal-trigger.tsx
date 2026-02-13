"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ContactModalTriggerProps = {
  title: string;
  address: string;
  phone: string;
  email: string;
  openingHoursTitle: string;
  openingHoursRow1: string;
  openingHoursRow2: string;
};

export default function ContactModalTrigger({
  title,
  address,
  phone,
  email,
  openingHoursTitle,
  openingHoursRow1,
  openingHoursRow2,
}: ContactModalTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const modal = open ? (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[rgba(12,20,16,0.62)] p-4 backdrop-blur-[2px] md:p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative my-auto flex w-[min(92vw,32rem)] max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_24px_70px_rgba(10,20,14,0.35)] md:max-h-[calc(100vh-4rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="shrink-0 border-b border-[var(--line)] bg-[var(--surface-strong)] px-5 py-4 pr-16">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            <svg
              className="contact-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8Z" />
              <path d="m7 9 5 4 5-4" />
            </svg>
            Kontakt
          </p>
          <h3 className="mt-1 font-[var(--font-playfair)] text-2xl text-[var(--brand)]">
            {title || "Ekhagens Golfrestaurang"}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-white/85 text-zinc-700 transition hover:bg-white"
          aria-label="Stang kontaktmodal"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="min-h-0 space-y-4 overflow-y-auto px-5 py-5 text-sm text-zinc-800">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              <svg
                className="contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
              Adress
            </p>
            <p className="mt-1">{address}</p>
          </div>

          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              <svg
                className="contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.4a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.8a2 2 0 0 1 1.7 2Z" />
              </svg>
              Telefon
            </p>
            <p className="mt-1">
              <a
                className="font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4"
                href={`tel:${phone.replace(/\s+/g, "")}`}
              >
                {phone}
              </a>
            </p>
          </div>

          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              <svg
                className="contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 8 9 6 9-6" />
              </svg>
              E-post
            </p>
            <p className="mt-1">
              <a
                className="font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </p>
          </div>

          {(openingHoursTitle || openingHoursRow1 || openingHoursRow2) ? (
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l2.5 1.8" />
                </svg>
                {openingHoursTitle || "Oppettider"}
              </p>
              {openingHoursRow1 ? <p className="mt-1">{openingHoursRow1}</p> : null}
              {openingHoursRow2 ? <p>{openingHoursRow2}</p> : null}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-[var(--line)] bg-[var(--surface-strong)] px-5 py-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            Stang
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button type="button" className="nav-link" onClick={() => setOpen(true)}>
        <svg
          className="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8Z" />
          <path d="m7 9 5 4 5-4" />
        </svg>
        Kontakt
      </button>
      {typeof window !== "undefined" && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
