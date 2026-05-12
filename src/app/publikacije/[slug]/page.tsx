import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";
import { PROJECTS } from "@/content/projects";

export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.category === "publikacije").map((p) => ({
    slug: p.href.split("/").pop() || p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find(
    (x) => x.category === "publikacije" && (x.href.split("/").pop() || x.slug) === slug
  );
  return {
    title: p ? `${p.title} · Publikacije · ARIH` : "Project · ARIH",
    description: p?.tagline || p?.description?.slice(0, 160) || undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <main>
        <ProjectDetail category="publikacije" slug={slug} />
        <Footer />
      </main>
    </>
  );
}
