"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "TailwindCSS",
      "TanStack",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "REST APIs",
      "Stripe",
      "Webhooks",
    ],
  },
  {
    title: "Infrastructure",
    skills: ["Vercel", "Railway", "Hetzner", "SQL", "Database Design"],
  },
  {
    title: "AI / ML",
    skills: [
      "RAG Systems",
      "LLM Integration",
      "Telegram Bots",
      "Slack Bots",
    ],
  },
  {
    title: "Tools",
    skills: ["Zed Editor", "Claude Code", "GitHub Desktop", "Git"],
  },
  {
    title: "Collaboration",
    skills: ["Linear", "Jira", "Asana", "ClickUp", "Slack"],
  },
];

export function Skills() {
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
          <span className="font-mono text-xs text-muted-foreground">02</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Expertise
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 font-serif text-3xl italic tracking-tight sm:text-4xl"
        >
          Tech Stack<span className="text-primary">.</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="group border-b border-r border-border bg-card/30 p-6 transition-colors duration-300 hover:bg-card/60 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+2)]:border-b lg:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-primary/80">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground"
                  >
                    {skill}
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
