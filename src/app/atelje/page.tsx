import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { AteljePlayground } from "@/components/AteljePlayground";
import { INTROS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Atelje · ARIH",
  description: INTROS.atelje.intro,
};

export default function AteljePage() {
  return (
    <>
      <Navbar />
      <main>
        <AteljePlayground />
      </main>
    </>
  );
}
