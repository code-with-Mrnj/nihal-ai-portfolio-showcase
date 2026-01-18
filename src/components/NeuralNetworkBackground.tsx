import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  layer: number;
  depthLayer: number; // 0=background, 1=mid, 2=foreground
}

interface Connection {
  id: string;
  from: Node;
  to: Node;
  delay: number;
}

export function NeuralNetworkBackground({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Generate layered neural network structure
  const { nodes, connections } = useMemo(() => {
    const allNodes: Node[] = [];
    const allConnections: Connection[] = [];
    
    // Create multiple neural network "blocks" vertically
    const networkBlocks = 4;
    const layersPerBlock = 6;
    const nodesPerLayer = [4, 8, 12, 12, 8, 4]; // Diamond shape per block
    
    for (let block = 0; block < networkBlocks; block++) {
      const blockOffsetY = block * 25; // Each block takes 25% of height
      
      for (let layerIdx = 0; layerIdx < layersPerBlock; layerIdx++) {
        const nodeCount = nodesPerLayer[layerIdx];
        const layerX = 10 + (layerIdx / (layersPerBlock - 1)) * 80; // Spread across 80% width
        
        for (let nodeIdx = 0; nodeIdx < nodeCount; nodeIdx++) {
          const depthLayer = Math.floor(Math.random() * 3);
          const verticalSpread = 20; // How much vertical space each layer takes
          const nodeY = blockOffsetY + 2 + (nodeIdx / Math.max(nodeCount - 1, 1)) * verticalSpread;
          
          // Add some randomness for organic feel
          const jitterX = (Math.random() - 0.5) * 5;
          const jitterY = (Math.random() - 0.5) * 3;
          
          allNodes.push({
            id: `${block}-${layerIdx}-${nodeIdx}`,
            x: Math.max(5, Math.min(95, layerX + jitterX)),
            y: Math.max(2, Math.min(98, nodeY + jitterY)),
            layer: block * layersPerBlock + layerIdx,
            depthLayer
          });
        }
      }
    }
    
    // Create connections between adjacent layers within each block
    for (let block = 0; block < networkBlocks; block++) {
      for (let layerIdx = 0; layerIdx < layersPerBlock - 1; layerIdx++) {
        const currentLayerNodes = allNodes.filter(n => 
          n.id.startsWith(`${block}-${layerIdx}-`)
        );
        const nextLayerNodes = allNodes.filter(n => 
          n.id.startsWith(`${block}-${layerIdx + 1}-`)
        );
        
        // Connect each node to 2-4 nodes in the next layer
        currentLayerNodes.forEach((fromNode, fromIdx) => {
          const connectionsCount = 2 + Math.floor(Math.random() * 3);
          const connectedIndices = new Set<number>();
          
          for (let c = 0; c < connectionsCount && connectedIndices.size < nextLayerNodes.length; c++) {
            // Prefer connecting to nearby nodes (by index position)
            let targetIdx: number;
            if (Math.random() > 0.3) {
              // Connect to nearby node
              const ratio = fromIdx / Math.max(currentLayerNodes.length - 1, 1);
              const baseTarget = Math.floor(ratio * (nextLayerNodes.length - 1));
              const offset = Math.floor((Math.random() - 0.5) * 4);
              targetIdx = Math.max(0, Math.min(nextLayerNodes.length - 1, baseTarget + offset));
            } else {
              // Random connection (skip connection feel)
              targetIdx = Math.floor(Math.random() * nextLayerNodes.length);
            }
            
            if (!connectedIndices.has(targetIdx)) {
              connectedIndices.add(targetIdx);
              const toNode = nextLayerNodes[targetIdx];
              
              // Delay based on position for wave effect
              const delay = (fromNode.y / 100) * 4;
              
              allConnections.push({
                id: `conn-${fromNode.id}-${toNode.id}`,
                from: fromNode,
                to: toNode,
                delay
              });
            }
          }
        });
      }
      
      // Add some skip connections (residual-like)
      if (block < networkBlocks) {
        const skipCount = 3;
        for (let s = 0; s < skipCount; s++) {
          const fromLayerIdx = Math.floor(Math.random() * (layersPerBlock - 2));
          const toLayerIdx = fromLayerIdx + 2 + Math.floor(Math.random() * 2);
          
          if (toLayerIdx < layersPerBlock) {
            const fromNodes = allNodes.filter(n => n.id.startsWith(`${block}-${fromLayerIdx}-`));
            const toNodes = allNodes.filter(n => n.id.startsWith(`${block}-${toLayerIdx}-`));
            
            if (fromNodes.length > 0 && toNodes.length > 0) {
              const fromNode = fromNodes[Math.floor(Math.random() * fromNodes.length)];
              const toNode = toNodes[Math.floor(Math.random() * toNodes.length)];
              
              allConnections.push({
                id: `skip-${fromNode.id}-${toNode.id}`,
                from: fromNode,
                to: toNode,
                delay: (fromNode.y / 100) * 4
              });
            }
          }
        }
      }
    }
    
    return { nodes: allNodes, connections: allConnections };
  }, []);

  const getDepthStyles = (depthLayer: number) => {
    switch (depthLayer) {
      case 0: return { opacity: 0.15, scale: 0.6, blur: 1 };
      case 1: return { opacity: 0.3, scale: 0.8, blur: 0.5 };
      case 2: return { opacity: 0.5, scale: 1, blur: 0 };
      default: return { opacity: 0.3, scale: 0.8, blur: 0.5 };
    }
  };

  return (
    <div className="relative">
      {/* Neural Network SVG Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--portfolio-surface)) 0%, hsl(var(--portfolio-bg)) 40%, #000 100%)'
          }}
        />

        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Neural network visualization */}
        <svg 
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: '400vh' }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Glow filter for nodes */}
            <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Glow filter for active connections */}
            <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Gradient for signal pulse on connections */}
            <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--portfolio-accent))" stopOpacity="0"/>
              <stop offset="40%" stopColor="hsl(var(--portfolio-accent))" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="1"/>
              <stop offset="60%" stopColor="hsl(var(--portfolio-accent))" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="hsl(var(--portfolio-accent))" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Static connection lines (base layer) */}
          <g className="neural-connections-base">
            {connections.map((conn) => {
              const depthStyle = getDepthStyles(Math.min(conn.from.depthLayer, conn.to.depthLayer));
              return (
                <line
                  key={`base-${conn.id}`}
                  x1={`${conn.from.x}%`}
                  y1={`${conn.from.y}%`}
                  x2={`${conn.to.x}%`}
                  y2={`${conn.to.y}%`}
                  stroke="hsl(var(--portfolio-accent))"
                  strokeWidth={0.3 * depthStyle.scale}
                  opacity={depthStyle.opacity * 0.3}
                />
              );
            })}
          </g>

          {/* Animated signal pulses traveling along connections */}
          <g className="neural-signals">
            {connections.map((conn) => {
              const depthStyle = getDepthStyles(Math.min(conn.from.depthLayer, conn.to.depthLayer));
              const dx = conn.to.x - conn.from.x;
              const dy = conn.to.y - conn.from.y;
              const length = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx) * (180 / Math.PI);
              
              return (
                <g key={`signal-${conn.id}`}>
                  {/* Signal pulse moving along the connection */}
                  <motion.circle
                    cx={`${conn.from.x}%`}
                    cy={`${conn.from.y}%`}
                    r={1.5 * depthStyle.scale}
                    fill="#00d4ff"
                    opacity={0}
                    filter="url(#connectionGlow)"
                    animate={prefersReducedMotion ? {} : {
                      cx: [`${conn.from.x}%`, `${conn.to.x}%`],
                      cy: [`${conn.from.y}%`, `${conn.to.y}%`],
                      opacity: [0, depthStyle.opacity * 0.8, depthStyle.opacity, depthStyle.opacity * 0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: conn.delay,
                      repeatDelay: 1
                    }}
                  />
                  
                  {/* Connection glow when signal passes */}
                  <motion.line
                    x1={`${conn.from.x}%`}
                    y1={`${conn.from.y}%`}
                    x2={`${conn.to.x}%`}
                    y2={`${conn.to.y}%`}
                    stroke="#00d4ff"
                    strokeWidth={1 * depthStyle.scale}
                    opacity={0}
                    filter="url(#connectionGlow)"
                    animate={prefersReducedMotion ? {} : {
                      opacity: [0, depthStyle.opacity * 0.6, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: conn.delay + 0.5,
                      repeatDelay: 1.5
                    }}
                  />
                </g>
              );
            })}
          </g>

          {/* Nodes */}
          <g className="neural-nodes">
            {nodes.map((node) => {
              const depthStyle = getDepthStyles(node.depthLayer);
              const nodeSize = 2 + node.depthLayer * 1.5;
              const isAccent = node.layer % 3 === 0;
              
              // Find connections from/to this node for activation timing
              const nodeConnections = connections.filter(
                c => c.from.id === node.id || c.to.id === node.id
              );
              const activationDelay = nodeConnections.length > 0 
                ? nodeConnections[0].delay 
                : (node.y / 100) * 4;
              
              return (
                <motion.circle
                  key={node.id}
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={nodeSize}
                  fill={isAccent ? "#00d4ff" : "hsl(var(--portfolio-accent))"}
                  opacity={depthStyle.opacity * 0.5}
                  filter="url(#nodeGlow)"
                  animate={prefersReducedMotion ? {} : {
                    opacity: [
                      depthStyle.opacity * 0.3,
                      depthStyle.opacity * 0.9,
                      depthStyle.opacity * 0.3
                    ],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: activationDelay,
                    repeatDelay: 1
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Depth gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)'
          }}
        />

        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
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