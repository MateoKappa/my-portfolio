"use client";

import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/bento-grid";
import { StaggerContainer } from "@/components/motion-wrapper";
import { Briefcase, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Sensay",
    period: "Jun 2023 - Jan 2025",
    type: "Founding Team",
    icon: Rocket,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-500/10",
    description:
      "Founding team member at AI startup building knowledge transfer and AI replica products. Joined as one of the first engineers and helped grow the company through multiple product pivots.",
    highlights: [
      "Built AI chatbot systems through 3 product evolutions",
      "Developed RAG pipeline with semantic chunking and vector search",
      "Achieved near-instant page loads with Next.js partial prerendering",
      "Designed database schema with Supabase Row-Level Security",
      "Created Telegram bot integrations powered by AI",
    ],
    stack: ["Next.js", "TypeScript", "Hono", "Supabase", "AI/LLM"],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "2021 - 2023",
    type: "Freelance",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    description:
      "Built web and mobile applications for startups and small businesses. Handled full project lifecycle from requirements gathering to deployment.",
    highlights: [
      "Delivered 6+ production projects for international clients",
      "Full lifecycle from requirements to deployment and maintenance",
      "Worked across web and mobile platforms",
      "Clients on Upwork with strong reviews",
    ],
    stack: ["Next.js", "React Native", "TypeScript", "TailwindCSS", "Supabase"],
  },
];

export function Experience() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Career
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Experience</h2>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: (idx: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: idx * 0.1,
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }),
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <BentoCard className="md:p-8 hover:border-primary/20 hover:shadow-[0_0_30px_-10px_rgba(201,169,110,0.1)]">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                  {/* Left - header */}
                  <div className="shrink-0 lg:w-72">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${exp.iconBg}`}
                      >
                        <exp.icon className={`h-5 w-5 ${exp.iconColor}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {exp.type}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-primary">{exp.company}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {exp.period}
                    </p>
                  </div>

                  {/* Right - details */}
                  <div className="flex-1">
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    <ul className="mb-5 space-y-2">
                      {exp.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-2.5 py-0.5 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
