import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projectsByCategory, INTROS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Publikacije — Publications · ARIH",
  description: INTROS.publikacije.intro,
};

export default function PublikacijePage() {
  const items = projectsByCategory("publikacije");
  return (
    <>
      <Navbar />
      <main>
        <ProjectArchive
          eyebrow="Publications"
          title={INTROS.publikacije.title + "."}
          lede={INTROS.publikacije.intro}
          items={items}
        />
        <Footer />
      </main>
    </>
  );
}
