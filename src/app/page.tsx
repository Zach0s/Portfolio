import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <div>
      <ScrollProgress />
      <SectionNav />
      <Hero />
      <Bio />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <ContactForm />
    </div>
  );
}
