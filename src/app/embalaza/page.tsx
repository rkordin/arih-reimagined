import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projectsByCategory, INTROS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Embalaža — Packaging · ARIH",
  description: INTROS.embalaza.intro,
};

export default function EmbalazaPage() {
  const items = projectsByCategory("embalaza");
  return (
    <>
      <Navbar />
      <main>
        <ProjectArchive
          eyebrow="Packaging"
          title={INTROS.embalaza.title + "."}
          lede={INTROS.embalaza.intro}
          items={items}
        />
        <Footer />
      </main>
    </>
  );
}
