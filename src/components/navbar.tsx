"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 py-4">
        <nav
          className={`flex items-center justify-between rounded-full border px-6 py-3 transition-all duration-500 ${
            scrolled
              ? "bg-[#111111]/80 backdrop-blur-xl border-border"
              : "border-transparent"
          }`}
        >
          <a href="#" className="text-lg font-serif italic tracking-tight">
            <span className="text-primary">M</span>
            <span className="text-foreground/70">K</span>
          </a>

          <div className="hidden items-center gap-1 sm:flex">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              >
                <a
                  href={link.href}
                  className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <a
              href="mailto:kapllanimateo01@gmail.com"
              className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:border-primary/50 active:scale-95"
            >
              Hire me
            </a>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
