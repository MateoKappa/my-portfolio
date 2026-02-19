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
    period: "Jun 2023 – Jan 2025",
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
    role: "Full Stack Developer",
    company: "Enviweb",
    period: "Mar 2022 – Sept 2023",
    type: "Freelance",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    description:
      "Built a multilingual online course platform with comprehensive admin controls and progress tracking.",
    highlights: [
      "Full internationalization support using next-international",
      "Custom course builder: videos, quizzes, markdown, rich text",
      "Student progress tracking and admin dashboard",
    ],
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
  },
  {
    role: "Full Stack Developer",
    company: "MarkenOn",
    period: "Sept 2023",
    type: "Upwork",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    description:
      "Developing an online SaaS startup for a B2B business, in charge of frontend and database integration.",
    highlights: [
      "Interactive analytics dashboard with Chart.js",
      "Secure authentication with login/signup flows",
      "Online order management system",
    ],
    stack: ["React", "TypeScript", "Chart.js", "Supabase"],
  },
  {
    role: "Frontend Developer",
    company: "TheForgeAI",
    period: "May 2023 – Oct 2023",
    type: "Upwork",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    description:
      "Developed and maintained the frontend for an AI-powered application builder platform.",
    highlights: [
      "Built interactive visual data flow editor using React Flow",
      "Implemented AI prompt engineering system",
      "Created custom UI editor for styling",
    ],
    stack: ["Next.js", "TypeScript", "React Flow", "AI/LLM"],
  },
  {
    role: "Mobile Developer",
    company: "Epoptia Cloud MES",
    period: "Jun 2023 – Aug 2023",
    type: "Contract",
    icon: Briefcase,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-500/10",
    description:
      "Developed frontend for a manufacturing execution system mobile application from scratch.",
    highlights: [
      "Built cross-platform mobile app with real-time data sync",
      "Worked with GraphQL endpoints for data fetching and live updates",
    ],
    stack: ["React Native", "Expo", "NativeBase", "GraphQL"],
  },
  {
    role: "Mobile Developer",
    company: "Travel Booking App",
    period: "2022",
    type: "Freelance",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    description:
      "Developed mobile application for a travel agency, collaborating with a team of developers.",
    highlights: [
      "Hotel search with advanced filtering via external APIs",
      "React Native Maps with interactive markers",
    ],
    stack: ["React Native", "Expo", "TypeScript"],
  },
  {
    role: "Full Stack Developer",
    company: "Digimust",
    period: "2021",
    type: "Upwork",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    description:
      "Created marketing website for a restaurant in Mykonos with focus on visual appeal.",
    highlights: [
      "Custom Framer Motion animations throughout",
      "Responsive design for desktop and mobile",
    ],
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
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
