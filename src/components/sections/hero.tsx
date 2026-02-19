"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const particles = [
  { x: "10%", y: "18%", size: 6, duration: 20, delay: 0 },
  { x: "82%", y: "12%", size: 4, duration: 25, delay: 2 },
  { x: "68%", y: "76%", size: 7, duration: 18, delay: 5 },
  { x: "22%", y: "78%", size: 5, duration: 22, delay: 3 },
  { x: "48%", y: "28%", size: 3, duration: 28, delay: 7 },
  { x: "90%", y: "48%", size: 5, duration: 21, delay: 1 },
];

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  // 3D tilt for photo card
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  // Subtle parallax shift for text block
  const textX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  // Ambient glow follows cursor
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-80, 80]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);

  // Light reflection across card surface
  const shineOpacity = useTransform(smoothX, [-0.5, 0.5], [0, 0.12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative flex min-h-screen flex-col justify-center pt-24 lg:pt-0">
      {/* Cursor-following ambient glow — outside overflow clip so it doesn't get cut */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e] opacity-[0.04] blur-[100px]"
        style={{ x: glowX, y: glowY }}
      />

      {/* Particles container — clipped so they don't leak */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 5, 0],
              opacity: [0.15, 0.3, 0.1, 0.25, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left: Text with subtle parallax */}
          <motion.div
            className="w-full flex-1 lg:w-auto"
            style={{ x: textX, y: textY }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mb-8 lg:mb-12"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm text-muted-foreground">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 font-serif text-[clamp(3rem,12vw,9rem)] font-normal italic leading-[0.9] tracking-tight lg:mb-6"
            >
              <span className="block">Mateo</span>
              <span className="block">
                Kapllani
                <span className="text-primary">.</span>
              </span>
            </motion.h1>

            {/* Golden accent line */}
            <motion.div
              className="mb-5 h-px w-12 bg-primary/50 lg:mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ transformOrigin: "left" }}
            />

            {/* Role + description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
              className="mb-6 max-w-lg lg:mb-10"
            >
              <p className="mb-2 text-lg font-medium text-foreground/60 lg:mb-3">
                Full-Stack Developer
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                5+ years building AI-powered web applications. From founding
                team to production — I ship fast, performant, and scalable code.
              </p>
            </motion.div>

            {/* Contact row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-6"
            >
              <span>Greece</span>
              <span className="hidden text-border sm:inline">|</span>
              <a
                href="mailto:kapllanimateo01@gmail.com"
                className="transition-colors hover:text-primary"
              >
                kapllanimateo01@gmail.com
              </a>
              <span className="hidden text-border sm:inline">|</span>
              <a
                href="https://linkedin.com/in/mateo-kapllani-284036228"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                LinkedIn
              </a>
              <span className="hidden text-border sm:inline">|</span>
              <a
                href="https://github.com/MateoKappa"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Interactive 3D photo card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="relative shrink-0"
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }}
          >
            <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-border/50 shadow-[0_20px_60px_-15px_rgba(201,169,110,0.15)] sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <Image
                src="/profile.jpg"
                alt="Mateo Kapllani"
                fill
                className="object-cover"
                priority
              />
              {/* Dynamic light reflection */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                style={{ opacity: shineOpacity }}
              />
            </div>
            {/* Soft glow beneath card */}
            <div className="pointer-events-none absolute -bottom-6 left-4 right-4 h-16 rounded-full bg-primary/10 blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
