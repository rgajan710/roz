"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Your name<input name="name" required maxLength={100} autoComplete="name" placeholder="Jane Smith" /></label><label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="jane@yourcompany.com" /></label></div>
    <div className="form-row"><label>What can we help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Website design & development</option><option>Brand & strategy</option><option>E-commerce</option><option>Something else</option></select></label><label>Approximate budget<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>$3,500 – $7,500</option><option>$7,500 – $15,000</option><option>$15,000+</option><option>Let's discuss</option></select></label></div>
    <label>Tell us a little about your project<textarea name="message" required minLength={10} maxLength={5000} rows={4} placeholder="A little about your idea, your goals, or just say hello..." /></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-bottom"><button className="button button-dark" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending..." : "Send your enquiry"} <ArrowUpRight size={17} /></button><span>We'll get back to you soon.</span></div>
    <p className="form-status" role="status" aria-live="polite">{status === "success" ? "Thank you! Your message is on its way." : status === "error" ? message : ""}</p>
  </form>;
}