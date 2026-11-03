export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  approach: string;
  solution: string;
  result: string;
  metric: string;
  stack: string[];
  color: string;
  isClient?: boolean;
  website?: string;
  imageExtension?: "png";
  imageVersion?: string;
  detailImageHeight?: number;
  customer?: string;
  testimonial?: string;
};

export const projects: Project[] = [
  { slug: "scent-vault", name: "Scent Vault", category: "Retail", tagline: "The world of haute parfumerie, beautifully catalogued.", description: "A searchable visual catalogue for an independent fragrance business.", challenge: "Make a large collection of fragrances easy to explore while giving the catalogue a distinctive, considered presentation.", approach: "Bring the collection together in an editorial experience, organized by perfume house and designed around visual discovery.", solution: "A responsive fragrance catalogue with search, category filters, product imagery, and bookmarks for favorite finds.", result: "The live catalogue presents 447 fragrances across 68 perfume houses, with tools to help visitors browse the collection.", metric: "447 fragrances / 68 houses", stack: ["HTML", "CSS", "JavaScript", "Netlify"], color: "#f2ede4", isClient: true, website: "https://perfvaultspidey.netlify.app/", imageExtension: "png", imageVersion: "2" },
  { slug: "outland", name: "OUTLAND", category: "Travel", tagline: "Take the long way.", description: "A field-ready storefront for gear made for the outside and the everyday.", challenge: "Make reliable outdoor essentials easy to discover, from overnight packs to camp gear and layers.", approach: "Pair a bold, trail-inspired identity with clear product categories, search, and practical product details.", solution: "A responsive outdoor storefront with product filters, a searchable eight-piece collection, and a demo pack.", result: "The live storefront organizes eight gear essentials across Packs, Layers, Camp, and Accessories.", metric: "8 outdoor essentials", stack: ["HTML", "CSS", "JavaScript", "Netlify"], color: "#18241d", isClient: true, website: "https://celebrated-stroopwafel-1b72e2.netlify.app/", imageExtension: "png", detailImageHeight: 1600, customer: "Keshav Shetty", testimonial: "The storefront captures the spirit of getting outside and makes it easy to find the essentials for the next trip." },
  { slug: "sunroom", name: "sunroom", category: "Beauty", tagline: "Skincare for your real life.", description: "A sunny, straightforward storefront for everyday skincare essentials.", challenge: "Make skincare feel approachable, with helpful product discovery instead of an overwhelming routine.", approach: "Use a warm visual identity and simple product categories to make daily care easy to browse.", solution: "A responsive skincare shop with search, product filters, a routine quiz, and an eight-product demo bag.", result: "The live storefront brings together eight skincare essentials, routine guidance, and product discovery tools.", metric: "8 skincare essentials", stack: ["HTML", "CSS", "JavaScript", "Netlify"], color: "#f7f3ed", isClient: true, website: "https://mellow-pudding-b10b58.netlify.app/", imageExtension: "png", detailImageHeight: 1600, customer: "Vidya Banerjee", testimonial: "The site makes skincare feel straightforward and welcoming, with a shopping experience that fits everyday routines." },
  { slug: "forme", name: "FORME", category: "Lifestyle", tagline: "A softer kind of living.", description: "A considered storefront for furniture and useful objects made for everyday life.", challenge: "Give thoughtfully made homewares a calm, editorial space that lets materials and details come through.", approach: "Keep the experience warm and uncluttered, with clear collections and product information.", solution: "A responsive homewares shop with category filters, search, and an eight-piece demo collection.", result: "The live storefront presents eight home pieces, from seating and lighting to everyday objects.", metric: "8 considered pieces", stack: ["HTML", "CSS", "JavaScript", "Netlify"], color: "#f5f2eb", isClient: true, website: "https://illustrious-beijinho-c72671.netlify.app/", imageExtension: "png", detailImageHeight: 1600, customer: "Ajay V Rai", testimonial: "The storefront reflects our thoughtful approach to furniture and makes exploring the collection feel effortless." },
];