"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  layer: number;
  index: number;
  activation: number;
  targetActivation: number;
}

interface Connection {
  from: number;
  to: number;
  weight: number;
  signal: number;
  signalProgress: number;
}

const GOLD = { r: 201, g: 169, b: 110 };
const LAYERS = [4, 6, 8, 6, 3];
const NODE_RADIUS = 6;

function buildNetwork(width: number, height: number) {
  const nodes: Node[] = [];
  const connections: Connection[] = [];

  const paddingX = 80;
  const paddingY = 50;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;
  const layerSpacing = usableWidth / (LAYERS.length - 1);

  // Create nodes
  LAYERS.forEach((count, layerIndex) => {
    const layerHeight = usableHeight;
    const nodeSpacing = layerHeight / (count + 1);

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: paddingX + layerIndex * layerSpacing,
        y: paddingY + nodeSpacing * (i + 1),
        layer: layerIndex,
        index: nodes.length,
        activation: 0,
        targetActivation: 0,
      });
    }
  });

  // Create connections between adjacent layers
  let prevLayerStart = 0;
  let prevLayerCount = LAYERS[0];

  for (let l = 1; l < LAYERS.length; l++) {
    const currLayerStart = prevLayerStart + prevLayerCount;
    const currLayerCount = LAYERS[l];

    for (let i = 0; i < prevLayerCount; i++) {
      for (let j = 0; j < currLayerCount; j++) {
        connections.push({
          from: prevLayerStart + i,
          to: currLayerStart + j,
          weight: 0.3 + Math.random() * 0.7,
          signal: 0,
          signalProgress: -1,
        });
      }
    }

    prevLayerStart = currLayerStart;
    prevLayerCount = currLayerCount;
  }

  return { nodes, connections };
}

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const networkRef = useRef<{ nodes: Node[]; connections: Connection[] } | null>(null);
  const animRef = useRef<number>(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const initNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    networkRef.current = buildNetwork(canvas.clientWidth, canvas.clientHeight);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNetwork();
    }
    resize();
    window.addEventListener("resize", resize);

    function animate() {
      const network = networkRef.current;
      if (!network) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const { nodes, connections } = network;

      // Update node activations (smooth lerp)
      for (const node of nodes) {
        node.activation += (node.targetActivation - node.activation) * 0.08;
        node.targetActivation *= 0.98; // decay
      }

      // Draw connections
      for (const conn of connections) {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        const baseAlpha = 0.06 + conn.weight * 0.06;
        const activation = Math.max(fromNode.activation, toNode.activation);
        const alpha = baseAlpha + activation * 0.3;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`;
        ctx.lineWidth = 0.5 + activation * 1.5;
        ctx.stroke();

        // Animate signal pulse
        if (conn.signalProgress >= 0 && conn.signalProgress <= 1) {
          conn.signalProgress += 0.025;
          const t = conn.signalProgress;
          const sx = fromNode.x + (toNode.x - fromNode.x) * t;
          const sy = fromNode.y + (toNode.y - fromNode.y) * t;
          const pulseAlpha = Math.sin(t * Math.PI) * 0.8;

          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
          gradient.addColorStop(
            0,
            `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${pulseAlpha})`
          );
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fillRect(sx - 8, sy - 8, 16, 16);

          // When signal reaches destination, activate destination node
          if (conn.signalProgress > 0.9) {
            toNode.targetActivation = Math.min(
              1,
              toNode.targetActivation + conn.weight * 0.4
            );
            // Propagate to next layer
            if (conn.signalProgress >= 1) {
              conn.signalProgress = -1;
              conn.signal = 0;
              // Fire connections from destination node
              for (const next of connections) {
                if (
                  next.from === conn.to &&
                  next.signalProgress < 0 &&
                  Math.random() < 0.6
                ) {
                  next.signalProgress = 0;
                  next.signal = conn.weight * 0.8;
                }
              }
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const alpha = 0.3 + node.activation * 0.7;
        const radius = NODE_RADIUS + node.activation * 4;

        // Glow
        const glow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          radius * 4
        );
        glow.addColorStop(
          0,
          `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${node.activation * 0.2})`
        );
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(
          node.x - radius * 4,
          node.y - radius * 4,
          radius * 8,
          radius * 8
        );

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initNetwork]);

  const activateNode = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const network = networkRef.current;
    if (!canvas || !network) return;

    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;

    // Find closest node
    let closestDist = Infinity;
    let closestNode: Node | null = null;

    for (const node of network.nodes) {
      const dx = node.x - mx;
      const dy = node.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < closestDist && dist < 40) {
        closestDist = dist;
        closestNode = node;
      }
    }

    if (closestNode) {
      closestNode.targetActivation = 1;
      setActiveNode(closestNode.index);

      // Fire signals from this node
      for (const conn of network.connections) {
        if (conn.from === closestNode.index && conn.signalProgress < 0) {
          conn.signalProgress = 0;
          conn.signal = 1;
        }
      }
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-pointer"
        onMouseMove={(e) => activateNode(e.clientX, e.clientY)}
        onClick={(e) => activateNode(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          activateNode(touch.clientX, touch.clientY);
        }}
      />
      {activeNode === null && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-muted-foreground/50">
            Hover over nodes to send signals
          </p>
        </div>
      )}
      <div className="absolute bottom-3 right-3 rounded-full border border-border/50 bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
        {LAYERS.reduce((a, b) => a + b, 0)} nodes &middot; {LAYERS.length} layers
      </div>
    </div>
  );
}
