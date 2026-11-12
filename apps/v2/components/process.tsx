const steps = [
  { number: "01", title: "Get curious", text: "We listen, ask better questions, and get to know the people behind the idea." },
  { number: "02", title: "Find the feeling", text: "We turn the strategy into a visual world with a point of view and a purpose." },
  { number: "03", title: "Make it real", text: "We build a considered, responsive experience and fine-tune the details together." },
  { number: "04", title: "Keep it growing", text: "We launch with care, hand things over clearly, and help with what comes next." },
] as const;

export function Process() {
  return <section className="process-section section-pad" aria-labelledby="process-heading">
    <div className="process-heading">
      <p className="section-kicker"><span className="status-dot" /> HOW THE GOOD HAPPENS</p>
      <h2 id="process-heading">Good things<br /><em>take shape.</em></h2>
      <p>No mysterious process. Just good people, thoughtful questions, and a shared vision for what&apos;s possible.</p>
    </div>
    <div className="process-steps">
      {steps.map((step) => <article className="process-step" key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span className="process-spark" aria-hidden="true">✳</span></article>)}
    </div>
  </section>;
}
