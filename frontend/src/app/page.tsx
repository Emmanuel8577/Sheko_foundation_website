import Footer from "@/components/common/Footer";
import AboutUsSection from "@/components/home/AboutUsSection";
import GallerySection from "@/components/home/GallerySection";
import Hero from "@/components/home/Hero";
import JourneySection from "@/components/home/JourneySection";
import TeamSection from "@/components/home/TeamSection";
import VolunteerSection from "@/components/home/VolunteersSection";
import WhatWeDo from "@/components/home/WhatWeDo";


export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo/>
      <AboutUsSection/>
      <JourneySection/>
      <TeamSection/>
      <VolunteerSection/>
      <GallerySection/>
      <Footer/>
    </main>
  );
}