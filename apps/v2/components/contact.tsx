"use client";

import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Clock, Globe } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { soundFX } from "@/lib/audio";

const DISCIPLINES = [
  "E-Commerce Flagship",
  "Three.js 3D & GLSL",
  "Brand Identity & Codex",
  "Spatial UI/UX Design",
  "Full Turnkey Studio",
] as const;

const BUDGETS = [
  "$15,000 – $30,000",
  "$30,000 – $60,000",
  "$60,000+ Enterprise",
  "To be calibrated",
] as const;

const TIMELINES = [
  "⚡ 4–6 Weeks (Rapid)",
  "✦ 8–12 Weeks (Flagship)",
  "✦ Q2/Q3 2026 Reservation",
] as const;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("E-Commerce Flagship");
  const [selectedBudget, setSelectedBudget] = useState<string>("$30,000 – $60,000");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("✦ 8–12 Weeks (Flagship)");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    soundFX.playClick();
    const form = event.currentTarget;
    setStatus("sending");
    setFeedback("");
    
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);
    
    // Enrich with interactive selections
    payload.service = selectedDiscipline;
    payload.budget = `${selectedBudget} · Timeline: ${selectedTimeline}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { ok?: boolean; error?: string } = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please email us directly.");
      }
      form.reset();
      setStatus("success");
      setFeedback("Thank you. Your project brief has been received — our founding partners will respond within 24 hours.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please email us directly.");
    }
  }

  return (
    <section id="contact" className="contact-showcase" aria-labelledby="contact-heading">
      <div className="contact-grid">
        <div className="contact-info-col">
          <div className="section-eyebrow">
            <span className="status-dot" />
            <span>07 / 07 &middot; INITIATION &amp; INQUIRY</span>
          </div>
          <h2 id="contact-heading" className="contact-headline">
            Let&apos;s build<br />
            something<br />
            <em>remarkable</em><span className="coral">.</span>
          </h2>
          <p className="contact-lead">
            Whether you&apos;re launching a brand new flagship platform or reimagining an existing digital identity, we engineer experiences that captivate, convert, and endure.
          </p>

          <div className="contact-direct-links">
            <div>
              <span className="contact-direct-label">DIRECT INQUIRIES</span>
              <a
                className="contact-direct-email"
                href="mailto:roz.enquire@gmail.com"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
              >
                roz.enquire@gmail.com <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div>
              <span className="contact-direct-label">STUDIO LOCATION &amp; SCALE</span>
              <p className="contact-direct-text">Bengaluru, India &mdash; Partnering Globally</p>
            </div>
          </div>

          {/* Studio Commitment Guarantee Badges */}
          <div className="studio-guarantee-card">
            <div className="guarantee-item">
              <ShieldCheck size={16} className="coral" aria-hidden="true" />
              <span>Direct partner leadership on every build</span>
            </div>
            <div className="guarantee-item">
              <Clock size={16} className="coral" aria-hidden="true" />
              <span>Detailed proposal &amp; architecture roadmap within 24h</span>
            </div>
            <div className="guarantee-item">
              <Globe size={16} className="coral" aria-hidden="true" />
              <span>Full international timezone &amp; deployment coverage</span>
            </div>
          </div>
        </div>

        <div className="contact-form-col">
          <form className="inquiry-form" onSubmit={submit}>
            {/* Interactive Scope & Discipline Selector */}
            <div className="interactive-scope-block">
              <span className="scope-group-label">01 // SELECT DISCIPLINE:</span>
              <div className="scope-chip-wrap">
                {DISCIPLINES.map((d) => {
                  const isSel = selectedDiscipline === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      className={`scope-chip${isSel ? " is-selected" : ""}`}
                      onClick={() => {
                        setSelectedDiscipline(d);
                        soundFX.playClick();
                      }}
                      onMouseEnter={() => soundFX.playHover()}
                    >
                      <Sparkles size={11} aria-hidden="true" />
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Investment Tier Selector */}
            <div className="interactive-scope-block">
              <span className="scope-group-label">02 // TARGET INVESTMENT:</span>
              <div className="scope-chip-wrap">
                {BUDGETS.map((b) => {
                  const isSel = selectedBudget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      className={`scope-chip${isSel ? " is-selected" : ""}`}
                      onClick={() => {
                        setSelectedBudget(b);
                        soundFX.playClick();
                      }}
                      onMouseEnter={() => soundFX.playHover()}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Timeline Selector */}
            <div className="interactive-scope-block">
              <span className="scope-group-label">03 // TARGET TIMELINE:</span>
              <div className="scope-chip-wrap">
                {TIMELINES.map((t) => {
                  const isSel = selectedTimeline === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`scope-chip${isSel ? " is-selected" : ""}`}
                      onClick={() => {
                        setSelectedTimeline(t);
                        soundFX.playClick();
                      }}
                      onMouseEnter={() => soundFX.playHover()}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Details */}
            <div className="form-fields-grid">
              <label className="field-group">
                <span className="field-label">YOUR NAME</span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="What should we call you?"
                  className="field-input"
                  onFocus={() => soundFX.playHover()}
                />
              </label>
              <label className="field-group">
                <span className="field-label">EMAIL ADDRESS</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="Where can we reach you?"
                  className="field-input"
                  onFocus={() => soundFX.playHover()}
                />
              </label>
            </div>

            <label className="field-group">
              <span className="field-label">PROJECT BRIEF &amp; OBJECTIVES</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={4}
                placeholder="Share your brand vision, target launch date, reference links, and what success looks like..."
                className="field-textarea"
                onFocus={() => soundFX.playHover()}
              />
            </label>

            {/* Honeypot anti-spam field */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            <Button
              type="submit"
              variant="coral"
              className="w-full"
              disabled={status === "sending"}
              onMouseEnter={() => soundFX.playHover()}
            >
              {status === "sending" ? "Dispatching Brief..." : "Submit Project Inquiry ↗"}
            </Button>

            {feedback && (
              <div
                className={`form-feedback-card ${status === "success" ? "is-success" : "is-error"}`}
                role="status"
              >
                {status === "success" && <CheckCircle2 size={16} aria-hidden="true" />}
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
