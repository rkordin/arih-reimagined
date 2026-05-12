import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projectsByCategory, INTROS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Priznanja — Awards · ARIH",
  description: INTROS.priznanja.intro,
};

export default function PriznanjaPage() {
  const items = projectsByCategory("priznanja");
  return (
    <>
      <Navbar />
      <main>
        <ProjectArchive
          eyebrow="Awarded work"
          title={INTROS.priznanja.title + "."}
          lede={INTROS.priznanja.intro}
          items={items}
          showCategory
        />
        <Footer />
      </main>
    </>
  );
}
