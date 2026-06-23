import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div style={{ background: "var(--bg)" }} className="transition-colors duration-300">
      <Hero />
      <div style={{ borderTop: "1px solid var(--card-border)" }} />
      <Bio />
      <div style={{ borderTop: "1px solid var(--card-border)" }} />
      <Experience />
      <div style={{ borderTop: "1px solid var(--card-border)" }} />
      <Education />
      <div style={{ borderTop: "1px solid var(--card-border)" }} />
      <Skills />
      <div style={{ borderTop: "1px solid var(--card-border)" }} />
      <ContactForm />
    </div>
  );
}
