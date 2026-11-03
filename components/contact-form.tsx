"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [emailFallback, setEmailFallback] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const subject = `Website enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${formData.get("email") || ""}`,
      `Service: ${formData.get("service") || "Not specified"}`,
      `Budget: ${formData.get("budget") || "Not specified"}`,
      "",
      String(formData.get("message") || ""),
    ].join("\n");
    setEmailFallback(`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
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
    <div className="form-row"><label>What can we help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Website design & development</option><option>Brand & strategy</option><option>E-commerce</option><option>Something else</option></select></label><label>Approximate budget<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Rs. 30,000 – Rs. 75,000</option><option>Rs. 75,000+</option><option>Let's discuss</option></select></label></div>
    <label>Tell us a little about your project<textarea name="message" required minLength={10} maxLength={5000} rows={4} placeholder="A little about your idea, your goals, or just say hello..." /></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-bottom"><button className="button button-dark" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending..." : "Send your enquiry"} <ArrowUpRight size={17} /></button><span>We'll get back to you soon.</span><a className="text-link" href={`mailto:${site.email}`}>Email us directly</a></div>
    <p className="form-status" role="status" aria-live="polite">{status === "success" ? "Thank you! Your message is on its way." : status === "error" ? <>{message} <a href={emailFallback}>Open this enquiry in your email app.</a></> : ""}</p>
  </form>;
}