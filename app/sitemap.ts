import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/privacy", "/terms", ...projects.map((project) => `/work/${project.slug}`)].map((path) => ({ url: `${site.url}${path}` })); }