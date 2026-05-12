import { Navbar } from "@/components/Navbar";
import { HeroVideo } from "@/components/HeroVideo";
import { Summary } from "@/components/Summary";
import { FeaturedLinks } from "@/components/FeaturedLinks";
import { About } from "@/components/About";
import { Extras } from "@/components/Extras";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVideo />
        <div className="o-container">
          <Summary />
          <FeaturedLinks />
          <About />
          <Extras />
        </div>
        <Footer />
      </main>
    </>
  );
}
