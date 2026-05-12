import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projectsByCategory, INTROS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Družbeno — Pro bono · ARIH",
  description: INTROS.druzbeno.intro,
};

export default function DruzbenoPage() {
  const items = projectsByCategory("druzbeno");
  return (
    <>
      <Navbar />
      <main>
        <ProjectArchive
          eyebrow="Pro bono · Community"
          title={INTROS.druzbeno.title + "."}
          lede={INTROS.druzbeno.intro}
          items={items}
        />
        <Footer />
      </main>
    </>
  );
}
