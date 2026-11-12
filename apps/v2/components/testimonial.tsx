export function Testimonial() {
  return <section className="testimonial-section section-pad" aria-labelledby="testimonial-heading">
    <div className="quote-top"><p className="section-kicker"><span className="status-dot" /> KIND WORDS / 01</p><span>THE BEST PART IS THE PEOPLE</span></div>
    <h2 id="testimonial-heading" className="sr-only">A word from a client</h2>
    <div className="quote-mark" aria-hidden="true">“</div>
    <blockquote>Work done was quick and easy, process was very effective, very professional group of people working together to provide me a great experience for my business</blockquote>
    <div className="quote-credit"><span className="quote-avatar">VS</span><div><strong>Vidhushi Sharma</strong><span>Scent Vault</span></div></div>
  </section>;
}
