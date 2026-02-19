"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Sensay",
    subtitle: "AI Knowledge & Replica Platform",
    year: "2023–2025",
    description:
      "Founding team member at AI startup building knowledge transfer and AI replica products across 3 major product evolutions.",
    highlights: [
      "Built AI chatbot systems with RAG pipeline and semantic chunking",
      "Achieved near-instant page loads with Next.js partial prerendering",
      "Designed database schema with Supabase Row-Level Security",
      "Created Telegram & Slack bot integrations powered by AI",
    ],
    stack: ["Next.js", "TypeScript", "Hono", "Supabase", "AI/LLM"],
  },
  {
    title: "Enviweb",
    subtitle: "Learning Management System",
    year: "2022–2023",
    description:
      "Multilingual online course platform with comprehensive admin controls and progress tracking.",
    highlights: [
      "Full internationalization support with next-international",
      "Custom course builder: videos, quizzes, markdown, rich text",
      "Student progress tracking system",
      "Admin dashboard with full content management",
    ],
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
  },
  {
    title: "MarkenOn",
    subtitle: "B2B SaaS Platform",
    year: "2023",
    description:
      "Online SaaS startup for B2B with analytics dashboard and order management.",
    highlights: [
      "Interactive analytics with Chart.js",
      "Authentication with login/signup flows",
      "Order management system",
    ],
    stack: ["React", "TypeScript", "Chart.js", "Supabase"],
  },
  {
    title: "TheForgeAI",
    subtitle: "AI Application Builder",
    year: "2023",
    description:
      "AI-powered application builder with visual data flow editor.",
    highlights: [
      "Visual data flow editor with React Flow",
      "AI prompt engineering system",
      "Custom UI editor for styling",
    ],
    stack: ["Next.js", "TypeScript", "React Flow", "AI/LLM"],
  },
  {
    title: "Epoptia Cloud MES",
    subtitle: "Manufacturing Execution System",
    year: "2023",
    description:
      "Mobile app for manufacturing execution with real-time data sync.",
    highlights: [
      "Cross-platform mobile from scratch",
      "Real-time data with GraphQL",
      "Live updates and synchronization",
    ],
    stack: ["React Native", "Expo", "GraphQL"],
  },
  {
    title: "Travel Booking App",
    subtitle: "Mobile Travel Platform",
    year: "2022",
    description:
      "Mobile app for a travel agency with hotel search and interactive maps.",
    highlights: [
      "Hotel search with advanced filtering",
      "React Native Maps integration",
      "SDK upgrade from 49 to 50",
    ],
    stack: ["React Native", "Expo", "TypeScript"],
  },
  {
    title: "Digimust",
    subtitle: "Restaurant Website",
    year: "2021",
    description:
      "Marketing website for a restaurant in Mykonos with rich animations.",
    highlights: [
      "Custom Framer Motion animations",
      "Responsive design",
      "Visual-first approach",
    ],
    stack: ["Next.js", "TypeScript", "Framer Motion"],
  },
];

export function Projects() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex items-center gap-4"
        >
          <span className="font-mono text-xs text-muted-foreground">03</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 font-serif text-3xl italic tracking-tight sm:text-4xl"
        >
          Selected Work<span className="text-primary">.</span>
        </motion.h2>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="group rounded-xl border border-border bg-card/30 p-6 transition-[color,border-color,background-color] duration-300 hover:border-primary/20 hover:bg-card/60"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-xl italic tracking-tight transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {project.subtitle}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground/50">
                  {project.year}
                </span>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="mb-5 space-y-2">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground/80"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
