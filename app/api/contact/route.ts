import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 16000) return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return NextResponse.json({ error: "Please check your message and try again." }, { status: 400 }); }
  if (!data || typeof data !== "object") return NextResponse.json({ error: "Please check your message and try again." }, { status: 400 });
  if (data.website) return NextResponse.json({ ok: true });
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const service = typeof data.service === "string" ? data.service.slice(0, 100) : "Not specified";
  const budget = typeof data.budget === "string" ? data.budget.slice(0, 100) : "Not specified";
  if (!name || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 5000) return NextResponse.json({ error: "Please provide your name, a valid email, and a message of at least 10 characters." }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) return NextResponse.json({ error: "Online enquiries aren't configured yet. Please email us directly instead." }, { status: 503 });
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: process.env.CONTACT_FROM_EMAIL, to: process.env.CONTACT_TO_EMAIL, replyTo: email, subject: `New project enquiry from ${name.replace(/[\r\n]/g, " ")}`, text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\n${message}` });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "We couldn't send your message. Please email us directly instead." }, { status: 502 }); }
}