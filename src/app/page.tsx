import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <main>
        <div className="relative z-[1]">
          <Hero />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="projects">
          <Projects />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <span className="font-serif text-sm italic text-muted-foreground">
            MK
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/MateoKappa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/50 transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mateo-kapllani-284036228"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/50 transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} Mateo Kapllani
          </p>
        </div>
      </footer>
    </div>
  );
}
