"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const orbs = [
  { color: "#c9a96e", size: 280, x: "30%", y: "40%", sensitivity: 0.12 },
  { color: "#8e7cc3", size: 220, x: "65%", y: "30%", sensitivity: 0.09 },
  { color: "#7a9e7e", size: 240, x: "50%", y: "65%", sensitivity: 0.15 },
  { color: "#cc7a6e", size: 200, x: "25%", y: "70%", sensitivity: 0.1 },
  { color: "#b08d6e", size: 180, x: "75%", y: "60%", sensitivity: 0.13 },
];

function Orb({
  color,
  size,
  initialX,
  initialY,
  sensitivity,
  mouseX,
  mouseY,
}: {
  color: string;
  size: number;
  initialX: string;
  initialY: string;
  sensitivity: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const spring = { stiffness: 40, damping: 25, mass: 1.5 };

  const offsetX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-150 * sensitivity * 10, 150 * sensitivity * 10]),
    spring
  );
  const offsetY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-150 * sensitivity * 10, 150 * sensitivity * 10]),
    spring
  );

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        x: offsetX,
        y: offsetY,
        background: `radial-gradient(circle, ${color} 0%, ${color}00 70%)`,
        filter: "blur(2px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.15, 0.95, 1.1, 1],
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function FluidGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full cursor-none overflow-hidden"
    >
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      {/* Orbs layer with heavy blur for fluid effect */}
      <div className="absolute inset-0" style={{ filter: "blur(60px) saturate(1.5)" }}>
        {orbs.map((orb, i) => (
          <Orb
            key={i}
            color={orb.color}
            size={orb.size}
            initialX={orb.x}
            initialY={orb.y}
            sensitivity={orb.sensitivity}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none absolute h-4 w-4 rounded-full border border-white/30 mix-blend-difference"
        style={{
          left: "50%",
          top: "50%",
          x: useSpring(useTransform(mouseX, [-0.5, 0.5], [-400, 400]), {
            stiffness: 300,
            damping: 20,
          }),
          y: useSpring(useTransform(mouseY, [-0.5, 0.5], [-250, 250]), {
            stiffness: 300,
            damping: 20,
          }),
        }}
      />

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border/50 bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
        move cursor
      </div>
    </div>
  );
}
