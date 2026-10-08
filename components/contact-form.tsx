"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const formElement = event.currentTarget;
    setBusy(true);
    setMessage("");
    setSuccess(false);
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), organization: form.get("organization"), message: form.get("message") }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.detail ?? "Your inquiry could not be saved. Please try again later.");
      }
      formElement.reset();
      setSuccess(true);
      setMessage("Your inquiry was saved to the website inbox.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Your inquiry could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Name<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <label>Organization <span className="optional">(optional)</span><input name="organization" autoComplete="organization" maxLength={120} /></label>
      <label>How can we help?<textarea name="message" required minLength={20} maxLength={4000} rows={6} /></label>
      <div className="form-submit"><button className="button" type="submit" disabled={busy}>{busy ? "Sending…" : "Send inquiry"}<span aria-hidden="true"> →</span></button><span className="form-note">Project inquiries only. No mine readings or operational data are collected here.</span></div>
      {message && <p className={`form-message${success ? " success" : ""}`} role="status" aria-live="polite">{success && <span className="checkmark" aria-hidden="true">✓</span>}{message}</p>}
      <p className="privacy-note">Submissions are stored by this website for follow-up. Configure an approved inbox, retention period, and access policy before public launch.</p>
    </form>
  );
}
