"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

const GOLD = { r: 201, g: 169, b: 110 };
const GRAVITY = 0.25;
const BOUNCE_DAMPING = 0.65;
const FRICTION = 0.998;

function randomColor(alpha: number) {
  const variation = () => Math.floor(Math.random() * 40 - 20);
  const r = Math.min(255, Math.max(0, GOLD.r + variation()));
  const g = Math.min(255, Math.max(0, GOLD.g + variation()));
  const b = Math.min(255, Math.max(0, GOLD.b + variation()));
  return `rgba(${r},${g},${b},${alpha})`;
}

export function GravitySandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const [count, setCount] = useState(0);

  const spawnParticles = useCallback((x: number, y: number) => {
    const amount = 8 + Math.floor(Math.random() * 8);
    for (let i = 0; i < amount; i++) {
      const angle = (Math.PI * 2 * i) / amount + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      const maxLife = 300 + Math.random() * 400;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        radius: 2 + Math.random() * 4,
        color: randomColor(1),
        alpha: 1,
        life: 0,
        maxLife,
      });
    }
    setCount(particlesRef.current.length);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width * window.devicePixelRatio;
      canvas!.height = rect.height * window.devicePixelRatio;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function animate() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics
        p.vy += GRAVITY;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade out
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        // Bounce off walls
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx *= -BOUNCE_DAMPING;
        }
        if (p.x + p.radius > w) {
          p.x = w - p.radius;
          p.vx *= -BOUNCE_DAMPING;
        }
        // Bounce off floor
        if (p.y + p.radius > h) {
          p.y = h - p.radius;
          p.vy *= -BOUNCE_DAMPING;
          p.vx *= 0.95; // floor friction
        }
        // Ceiling
        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy *= -BOUNCE_DAMPING;
        }

        // Remove dead particles
        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 3
        );
        gradient.addColorStop(
          0,
          `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.alpha * 0.15})`
        );
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(
          p.x - p.radius * 3,
          p.y - p.radius * 3,
          p.radius * 6,
          p.radius * 6
        );

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.alpha})`;
        ctx.fill();
      }

      if (particles.length !== count) {
        setCount(particles.length);
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  const handleInteraction = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      spawnParticles(clientX - rect.left, clientY - rect.top);
    },
    [spawnParticles]
  );

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-crosshair"
        onClick={(e) => handleInteraction(e.clientX, e.clientY)}
        onMouseMove={(e) => {
          if (e.buttons === 1) handleInteraction(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          handleInteraction(touch.clientX, touch.clientY);
        }}
      />
      {/* Hint overlay */}
      {count === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-muted-foreground/50">
            Click or drag to spawn particles
          </p>
        </div>
      )}
      {/* Particle counter */}
      <div className="absolute bottom-3 right-3 rounded-full border border-border/50 bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
        {count} particles
      </div>
    </div>
  );
}
