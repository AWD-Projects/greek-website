import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Venues from "@/components/Venues";
import Services from "@/components/Services";
import Videos from "@/components/Videos";
import Gallery from "@/components/Gallery";
import Podcast from "@/components/Podcast";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { ScrollProgress } from "@/components/Motion";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Venues />
        <Services />
        <Videos />
        <Gallery />
        <Podcast />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
