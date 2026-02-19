"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Sensay",
    period: "Jun 2023 – Jan 2025",
    description:
      "Founding team member at AI startup building knowledge transfer and AI replica products across multiple product pivots.",
  },
  {
    role: "Full Stack Developer",
    company: "Enviweb",
    period: "Mar 2022 – Sept 2023",
    description:
      "Built a multilingual online course platform with admin controls, progress tracking, and internationalization.",
  },
  {
    role: "Frontend Developer",
    company: "TheForgeAI",
    period: "May 2023 – Oct 2023",
    description:
      "Built the frontend for an AI-powered application builder with visual data flow editor using React Flow.",
  },
  {
    role: "Mobile Developer",
    company: "Epoptia Cloud MES",
    period: "Jun 2023 – Aug 2023",
    description:
      "Developed manufacturing execution system mobile app from scratch with real-time GraphQL data sync.",
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Various Clients",
    period: "2021 – 2023",
    description:
      "Delivered multiple projects for international clients on Upwork — from B2B analytics platforms to restaurant marketing sites and mobile booking apps.",
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
                Full Stack Developer with 5+ years of experience building
                AI-powered web applications. Early-stage startup veteran who
                helped grow Sensay from founding team to a full product company.
              </p>
              <p className="leading-relaxed">
                I specialize in high-performance web applications with Next.js,
                production AI systems including chatbots and RAG pipelines, and
                full-stack development from prototype to production.
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
                  University of Thessaly (UTH)
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
