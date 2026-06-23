import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <Bio />
      <Experience />
      <Education />
      <Skills />
      <ContactForm />
    </div>
  );
}
