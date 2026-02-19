"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Sensay",
    period: "Jun 2023 – Jan 2026",
    description:
      "Built AI-powered knowledge platform with RAG systems, Stripe integration, and Telegram/Slack bots.",
  },
  {
    role: "Mobile & Full-Stack Developer",
    company: "Travelmyth",
    period: "2023 – 2024",
    description:
      "Developed cross-platform mobile app for hotel booking aggregator using React Native and Expo.",
  },
  {
    role: "Blockchain Developer",
    company: "Fankee",
    period: "Apr 2023 – Jul 2023",
    description:
      "Built Web3 music platform with NFT minting system and fractional song ownership.",
  },
  {
    role: "Full-Stack Developer",
    company: "Enviweb",
    period: "2022 – 2023",
    description:
      "Developed product data management system with web scraping and price comparison features.",
  },
];

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-14 flex items-center gap-4">
      <span className="font-mono text-xs text-muted-foreground">{number}</span>
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function About() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="01" label="About" />
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column — About */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="mb-10 font-serif text-4xl italic leading-tight tracking-tight sm:text-5xl">
              Building digital
              <br />
              products that
              <br />
              scale<span className="text-primary">.</span>
            </h2>

            <div className="space-y-5 text-muted-foreground">
              <p className="leading-relaxed">
                Full-Stack Developer with expertise in building production-ready
                web and mobile applications. Specialized in modern
                JavaScript/TypeScript ecosystems, blockchain integrations, and
                AI-powered systems.
              </p>
              <p className="leading-relaxed">
                From RAG systems and LLM-powered applications to NFT platforms
                and payment integrations, I bring ideas to life with clean,
                scalable code and thoughtful architecture.
              </p>
            </div>

            {/* Divider */}
            <div className="my-10 h-px w-full bg-border" />

            {/* Education */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">BSc in Digital Systems</h3>
                <p className="text-sm text-muted-foreground">
                  University of Thessaly
                </p>
                <p className="text-sm text-muted-foreground">
                  Thesis: Quantum Games
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column — Experience timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-10 flex items-center gap-2.5"
            >
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Experience
              </h3>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[5px] top-3 bottom-3 w-px bg-border" />

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      delay: i * 0.12,
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-6 flex h-[11px] w-[11px] items-center justify-center">
                      <div className="h-[9px] w-[9px] rounded-full border-2 border-muted-foreground/50 bg-background transition-colors group-hover:border-primary" />
                    </div>

                    {/* Card */}
                    <div className="group rounded-xl border border-border bg-card/50 p-5 transition-all duration-300 hover:border-primary/20 hover:bg-card">
                      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </div>

                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border">
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium leading-tight">
                            {exp.role}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
