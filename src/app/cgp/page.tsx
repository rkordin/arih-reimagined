import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projectsByCategory, INTROS } from "@/content/projects";

export const metadata: Metadata = {
  title: "CGP — Celostna grafična podoba · ARIH",
  description: INTROS.cgp.intro,
};

export default function CgpPage() {
  const items = projectsByCategory("cgp");
  return (
    <>
      <Navbar />
      <main>
        <ProjectArchive
          eyebrow="Visual Identity"
          title={INTROS.cgp.title + "."}
          lede={INTROS.cgp.intro}
          items={items}
        />
        <Footer />
      </main>
    </>
  );
}
