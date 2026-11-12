import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };
export const instant = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: `${project.name} | ${project.isClient ? "Client project" : "Concept project"}`, description: project.description, openGraph: { title: `${project.name} | ${site.name}`, description: project.description } };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const extension = project.imageExtension || "svg";
  const imageVersion = project.imageVersion ? `?v=${project.imageVersion}` : "";
  return <main className="case-study"><div className="wrap">
    <Link className="back-link" href="/#work"><ArrowLeft size={16} /> Back to work</Link>
    <div className="case-heading"><div><div className="section-kicker">{project.isClient ? "CLIENT PROJECT" : "CONCEPT PROJECT"} / {project.category.toUpperCase()}</div><h1>{project.name}<span className="coral">.</span></h1><p>{project.tagline}</p></div><div className="case-summary"><span>THE PROJECT</span><p>{project.description}</p>{project.customer && <><span>CUSTOMER</span><p>{project.customer}</p></>}<span>THE TOOLKIT</span><p>{project.stack.join(" / ")}</p>{project.website && <a className="text-link" href={project.website} target="_blank" rel="noreferrer">Visit the live site <ArrowUpRight size={16} /></a>}</div></div>
    <div className="case-cover" style={{ backgroundColor: project.color }}><Image src={`/work/${project.slug}/cover.${extension}${imageVersion}`} width={1200} height={850} unoptimized={!!project.imageVersion} priority alt={project.isClient ? `${project.name} website homepage` : `${project.name} website concept displayed in a browser`} /></div>
    {project.isClient ? <div className="case-disclaimer">✳ Screenshots from the live {project.name} website.</div> : <div className="case-disclaimer">✳ A fictional concept project. Client names, results, and testimonials are illustrative, not actual client work.</div>}
    <div className="case-body"><div className="case-label">THE THINKING<br />BEHIND THE WORK</div><div><article><span>01 / THE CHALLENGE</span><h2>A good place to start.</h2><p>{project.challenge}</p></article><article><span>02 / THE APPROACH</span><h2>Thoughtful by design.</h2><p>{project.approach}</p></article><article><span>03 / THE SOLUTION</span><h2>Made to make a difference.</h2><p>{project.solution}</p></article></div></div>
    <div className="case-gallery"><Image src={`/work/${project.slug}/detail.${extension}${imageVersion}`} width={project.detailImageHeight ? 1440 : 1200} height={project.detailImageHeight || 850} unoptimized={!!project.imageVersion} alt={project.isClient ? `${project.name} product collection screenshot` : `${project.name} concept website detail`} /><Image src={`/work/${project.slug}/cover.${extension}${imageVersion}`} width={1200} height={850} unoptimized={!!project.imageVersion} alt={project.isClient ? `${project.name} homepage overview` : `${project.name} concept website overview`} /></div>
    <div className="case-result"><div><span>{project.isClient ? "04 / THE CATALOGUE" : "04 / THE IMAGINED OUTCOME"}</span><h2>Good things<br /><em>ahead.</em></h2></div><div><strong>{project.metric}</strong><p>{project.result}{!project.isClient && " This metric is illustrative, not a measured result."}</p></div></div>
    {project.testimonial && project.customer && <section className="case-testimonial"><span>CLIENT TESTIMONIAL</span><blockquote>“{project.testimonial}”</blockquote><p>— {project.customer}, {project.name}</p></section>}
    <Link className="next-project" href={`/work/${next.slug}`}><span>NEXT {next.isClient ? "CLIENT" : "CONCEPT"} PROJECT</span><strong>{next.name}</strong><ArrowUpRight size={32} /></Link>
  </div></main>;
}