import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projectsByCategory, INTROS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Akcije — Komunikacijske akcije · ARIH",
  description: INTROS.akcije.intro,
};

export default function AkcijePage() {
  const items = projectsByCategory("akcije");
  return (
    <>
      <Navbar />
      <main>
        <ProjectArchive
          eyebrow="Campaigns"
          title={INTROS.akcije.title + "."}
          lede={INTROS.akcije.intro}
          items={items}
        />
        <Footer />
      </main>
    </>
  );
}
