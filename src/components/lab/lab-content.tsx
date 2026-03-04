"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, Sparkles } from "lucide-react";
import Link from "next/link";
import { GravitySandbox } from "./gravity-sandbox";
import { FluidGradient } from "./fluid-gradient";
import { NeuralNetwork } from "./neural-network";

const experiments = [
  {
    id: "gravity",
    number: "01",
    title: "Gravity Sandbox",
    description:
      "Click anywhere to spawn particles. Watch them fall, bounce, and interact with physics in real time.",
    tags: ["Canvas API", "Physics", "Animation Loop"],
    component: GravitySandbox,
  },
  {
    id: "gradient",
    number: "02",
    title: "Fluid Gradient",
    description:
      "Move your cursor to warp and blend a living gradient mesh. Each orb reacts to your movement with spring physics.",
    tags: ["Framer Motion", "Spring Physics", "CSS Filters"],
    component: FluidGradient,
  },
  {
    id: "neural",
    number: "03",
    title: "Neural Network",
    description:
      "An animated neural network visualization. Hover over nodes to send signal pulses through the network.",
    tags: ["Canvas API", "Graph Theory", "Pathfinding"],
    component: NeuralNetwork,
  },
];

export function LabContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to portfolio
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <FlaskConical className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm text-primary">Interactive Experiments</span>
          </div>
          <h1 className="mb-4 font-serif text-[clamp(2.5rem,8vw,5rem)] font-normal italic leading-[0.95] tracking-tight">
            The Lab
            <span className="text-primary">.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            A collection of interactive experiments exploring physics, generative
            art, and real-time visualizations. Click, hover, and play.
          </p>
        </motion.div>
      </div>

      {/* Experiments */}
      <div className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="flex flex-col gap-10">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="group overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors hover:border-primary/20">
                {/* Experiment header */}
                <div className="flex flex-col gap-3 border-b border-border/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 font-mono text-xs text-primary/50">
                      {exp.number}
                    </span>
                    <div>
                      <h2 className="mb-1 flex items-center gap-2 text-lg font-medium text-foreground">
                        {exp.title}
                        <Sparkles className="h-3.5 w-3.5 text-primary/40" />
                      </h2>
                      <p className="max-w-md text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-8 flex flex-wrap gap-2 sm:ml-0">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experiment canvas */}
                <div className="relative h-[400px] w-full bg-[#0d0d0d] sm:h-[450px]">
                  <exp.component />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
          <p className="text-sm text-muted-foreground">
            Built with Canvas API, Framer Motion &amp; React.{" "}
            <Link href="/" className="text-primary transition-colors hover:text-primary/80">
              Back to portfolio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
