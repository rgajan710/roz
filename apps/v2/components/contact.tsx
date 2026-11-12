"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result: { ok?: boolean; error?: string } = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Something went wrong. Please email us directly.");
      form.reset();
      setStatus("success");
      setFeedback("Thank you. Your message is on its way.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please email us directly.");
    }
  }

  return <section id="contact" className="contact-section section-pad" aria-labelledby="contact-heading">
    <div className="contact-copy"><p className="section-kicker"><span className="status-dot" /> THE START OF SOMETHING GOOD</p><h2 id="contact-heading">Have a good<br /><em>feeling?</em></h2><p>Tell us what you&apos;re dreaming up. We&apos;d love to hear about it.</p><a className="contact-email" href="mailto:roz.enquire@gmail.com">roz.enquire@gmail.com <ArrowUpRight size={18} aria-hidden="true" /></a><span className="contact-flower" aria-hidden="true">✳</span></div>
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="What should we call you?" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Where can we find you?" /></label></div>
      <div className="form-row"><label>What can we help with?<select name="service" defaultValue=""><option value="">Choose a service</option><option>Strategy & identity</option><option>Website design</option><option>Development</option><option>E-commerce</option><option>Something else</option></select></label><label>Project budget<select name="budget" defaultValue=""><option value="">Choose a range</option><option>Under Rs. 30,000</option><option>Rs. 30,000 – Rs. 75,000</option><option>Rs. 75,000 – Rs. 1,50,000</option><option>Rs. 1,50,000+</option><option>Not sure yet</option></select></label></div>
      <label>Tell us a little more<textarea name="message" required minLength={10} maxLength={5000} rows={3} placeholder="The big idea, the small details, anything at all." /></label>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-bottom"><Button type="submit" variant="dark" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send your note"} <ArrowUpRight size={18} aria-hidden="true" /></Button><span>NO SPAM. JUST A REAL HUMAN REPLY.</span></div>
      <p className="form-feedback" role="status" aria-live="polite">{feedback}</p>
    </form>
  </section>;
}
