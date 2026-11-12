export const site = {
  name: "roz",
  tagline: "Thoughtful websites. Remarkable results.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  email: "roz.enquire@gmail.com",
  location: "Bengaluru, India · Working everywhere",
  description: "Independent digital studio making thoughtful websites for good businesses.",
};

export const services = [
  { number: "01", icon: "sparkles", title: "Brand & strategy", description: "Find the clearest, most compelling way to tell the world who you are." },
  { number: "02", icon: "layout", title: "Website design", description: "A distinctive digital home that looks the part and works beautifully." },
  { number: "03", icon: "code", title: "Development", description: "Fast, accessible websites built with care and ready to grow with you." },
  { number: "04", icon: "shopping", title: "E-commerce", description: "A smoother path from first impression to favorite new customer." },
  { number: "05", icon: "search", title: "SEO & content", description: "Get found by the right people and give them a reason to stay." },
  { number: "06", icon: "heart", title: "Care & support", description: "A reliable partner for the updates, improvements, and what-comes-next." },
] as const;

export const testimonials = [
  { quote: "Work done was quick and easy, process was very effective, very professional group of people working together to provide me a great experience for my business", name: "Vidhushi Sharma", role: "Scent Vault", avatar: "", isClient: true },
];

export const faqs = [
  { question: "How long does a project take?", answer: "Most websites take between four and eight weeks, depending on the scope and how quickly we can gather feedback. We'll agree on a realistic timeline before we begin." },
  { question: "What does a website cost?", answer: "Every project is different. Our starting points below give you a useful guide, and we'll put together a clear, fixed proposal once we understand what you need." },
  { question: "Can you work with our existing brand?", answer: "Absolutely. We can work with an established identity, help refine it, or build something new together." },
  { question: "Will I be able to update the site myself?", answer: "Yes. We'll recommend the right content tools for your team and make sure you feel confident using them before launch." },
  { question: "What happens after launch?", answer: "We'll be there for the handover and can continue as your ongoing partner for maintenance, improvements, and new ideas." },
];

export const plans = [
  { name: "Base", price: "From Rs. 30,000", description: "A thoughtful, polished website to get you going.", features: ["Strategy & creative direction", "Up to 5 custom pages", "Responsive design & development", "Launch support"] },
  { name: "Premium", price: "From Rs. 75,000", description: "A fuller digital experience, built to grow with you.", features: ["Everything in Base", "Up to 10 custom pages", "CMS or e-commerce setup", "SEO foundations & analytics"], featured: true },
];