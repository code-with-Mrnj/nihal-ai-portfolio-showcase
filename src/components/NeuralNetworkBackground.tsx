import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  layer: number;
  connections: number[];
}

export function NeuralNetworkBackground({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    // Generate neural network nodes
    const generateNodes = () => {
      const newNodes: Node[] = [];
      const nodeCount = 200; // Increased from 80 for denser pattern
      
      for (let i = 0; i < nodeCount; i++) {
        const layer = Math.floor(Math.random() * 3); // 0, 1, 2 for depth layers
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          layer,
          connections: []
        });
      }

      // Create connections between nearby nodes
      newNodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * 4) + 2; // More connections per node
        for (let c = 0; c < connectionCount; c++) {
          const targetIdx = Math.floor(Math.random() * nodeCount);
          if (targetIdx !== i && !node.connections.includes(targetIdx)) {
            const dx = Math.abs(node.x - newNodes[targetIdx].x);
            const dy = Math.abs(node.y - newNodes[targetIdx].y);
            // Connect nodes within range
            if (dx < 25 && dy < 25) {
              node.connections.push(targetIdx);
            }
          }
        }
      });

      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  const getLayerStyles = (layer: number) => {
    switch (layer) {
      case 0: // Background layer
        return { opacity: 0.15, scale: 0.8 };
      case 1: // Mid layer
        return { opacity: 0.25, scale: 1 };
      case 2: // Foreground layer
        return { opacity: 0.35, scale: 1.2 };
      default:
        return { opacity: 0.2, scale: 1 };
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Neural Network SVG Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--portfolio-surface)) 0%, hsl(var(--portfolio-bg)) 50%, #000 100%)'
          }}
        />

        {/* Noise/grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Neural network pattern */}
        <svg 
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: '200vh' }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Glow filter for nodes */}
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Gradient for connections */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--portfolio-accent))" stopOpacity="0.1"/>
              <stop offset="50%" stopColor="hsl(var(--portfolio-accent))" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="hsl(var(--portfolio-accent))" stopOpacity="0.1"/>
            </linearGradient>

            {/* Cyan accent gradient */}
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.05"/>
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.05"/>
            </linearGradient>
          </defs>

          {/* Connections */}
          <g className="neural-connections">
            {nodes.map((node) =>
              node.connections.map((targetIdx) => {
                const target = nodes[targetIdx];
                if (!target) return null;
                const layerStyle = getLayerStyles(node.layer);
                // Wave delay based on Y position (0-5 seconds based on vertical position)
                const waveDelay = (node.y / 100) * 5;
                return (
                  <motion.line
                    key={`${node.id}-${targetIdx}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={node.layer === 2 ? "url(#cyanGradient)" : "url(#connectionGradient)"}
                    strokeWidth={0.5 * layerStyle.scale}
                    opacity={layerStyle.opacity * 0.6}
                    initial={{ pathLength: 0 }}
                    animate={prefersReducedMotion ? {} : { 
                      opacity: [layerStyle.opacity * 0.3, layerStyle.opacity * 0.9, layerStyle.opacity * 0.3]
                    }}
                    transition={{
                      opacity: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: waveDelay
                      }
                    }}
                  />
                );
              })
            )}
          </g>

          {/* Nodes */}
          <g className="neural-nodes">
            {nodes.map((node) => {
              const layerStyle = getLayerStyles(node.layer);
              const nodeSize = 2 + node.layer * 1.5;
              const isAccent = node.id % 3 === 0; // Deterministic instead of random for consistent rendering
              // Wave delay based on Y position - creates top-to-bottom wave effect
              const waveDelay = (node.y / 100) * 5;
              
              return (
                <motion.circle
                  key={node.id}
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={nodeSize}
                  fill={isAccent ? "#00d4ff" : "hsl(var(--portfolio-accent))"}
                  opacity={layerStyle.opacity}
                  filter="url(#nodeGlow)"
                  initial={{ scale: 1 }}
                  animate={prefersReducedMotion ? {} : {
                    opacity: [layerStyle.opacity * 0.4, layerStyle.opacity * 1.2, layerStyle.opacity * 0.4],
                    scale: [1, 1.4, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: waveDelay
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Depth gradient overlay - increases density feeling as you scroll */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)'
          }}
        />

        {/* Vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}