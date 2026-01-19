import { useEffect, useState, useMemo } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  layer: number;
  depthLayer: number;
}

interface Connection {
  id: string;
  from: Node;
  to: Node;
  delay: number;
}

export function NeuralNetworkBackground({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Detect low-end devices
    const cores = navigator.hardwareConcurrency || 4;
    setIsLowEndDevice(cores <= 4);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Drastically reduced network - from ~3000 to ~150 elements
  const { nodes, connections } = useMemo(() => {
    const allNodes: Node[] = [];
    const allConnections: Connection[] = [];
    
    // Reduced: 3 blocks instead of 8, 5 layers instead of 8
    const networkBlocks = isLowEndDevice ? 2 : 3;
    const layersPerBlock = 5;
    const nodesPerLayer = [3, 5, 7, 5, 3]; // Reduced from [5,10,16,20,20,16,10,5]
    
    for (let block = 0; block < networkBlocks; block++) {
      const blockOffsetY = block * (100 / networkBlocks);
      
      for (let layerIdx = 0; layerIdx < layersPerBlock; layerIdx++) {
        const nodeCount = nodesPerLayer[layerIdx];
        const layerX = 10 + (layerIdx / (layersPerBlock - 1)) * 80;
        
        for (let nodeIdx = 0; nodeIdx < nodeCount; nodeIdx++) {
          const depthLayer = Math.floor(Math.random() * 3);
          const verticalSpread = 100 / networkBlocks - 5;
          const nodeY = blockOffsetY + 2 + (nodeIdx / Math.max(nodeCount - 1, 1)) * verticalSpread;
          
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
    
    // Reduced connections - only 1-2 per node instead of 2-4
    for (let block = 0; block < networkBlocks; block++) {
      for (let layerIdx = 0; layerIdx < layersPerBlock - 1; layerIdx++) {
        const currentLayerNodes = allNodes.filter(n => 
          n.id.startsWith(`${block}-${layerIdx}-`)
        );
        const nextLayerNodes = allNodes.filter(n => 
          n.id.startsWith(`${block}-${layerIdx + 1}-`)
        );
        
        currentLayerNodes.forEach((fromNode, fromIdx) => {
          const connectionsCount = 1 + Math.floor(Math.random() * 2); // Reduced from 2-4
          const connectedIndices = new Set<number>();
          
          for (let c = 0; c < connectionsCount && connectedIndices.size < nextLayerNodes.length; c++) {
            let targetIdx: number;
            if (Math.random() > 0.3) {
              const ratio = fromIdx / Math.max(currentLayerNodes.length - 1, 1);
              const baseTarget = Math.floor(ratio * (nextLayerNodes.length - 1));
              const offset = Math.floor((Math.random() - 0.5) * 2);
              targetIdx = Math.max(0, Math.min(nextLayerNodes.length - 1, baseTarget + offset));
            } else {
              targetIdx = Math.floor(Math.random() * nextLayerNodes.length);
            }
            
            if (!connectedIndices.has(targetIdx)) {
              connectedIndices.add(targetIdx);
              const toNode = nextLayerNodes[targetIdx];
              const delay = (fromNode.y / 100) * 6;
              
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
      
      // Reduced skip connections - 2 instead of 6
      const skipCount = isLowEndDevice ? 1 : 2;
      for (let s = 0; s < skipCount; s++) {
        const fromLayerIdx = Math.floor(Math.random() * (layersPerBlock - 2));
        const toLayerIdx = fromLayerIdx + 2;
        
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
              delay: (fromNode.y / 100) * 6
            });
          }
        }
      }
    }
    
    return { nodes: allNodes, connections: allConnections };
  }, [isLowEndDevice]);

  // Only animate 15% of connections for performance
  const animatedConnections = useMemo(() => {
    if (prefersReducedMotion || isLowEndDevice) return [];
    return connections.filter(() => Math.random() < 0.15);
  }, [connections, prefersReducedMotion, isLowEndDevice]);

  const getDepthStyles = (depthLayer: number) => {
    switch (depthLayer) {
      case 0: return { opacity: 0.15, scale: 0.6 };
      case 1: return { opacity: 0.3, scale: 0.8 };
      case 2: return { opacity: 0.5, scale: 1 };
      default: return { opacity: 0.3, scale: 0.8 };
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

        {/* Neural network visualization - using CSS animations instead of Framer Motion */}
        <svg 
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: '400vh' }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Static connection lines */}
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
                  opacity={depthStyle.opacity * 0.4}
                />
              );
            })}
          </g>

          {/* Animated signal pulses - CSS animations, reduced count */}
          {!prefersReducedMotion && !isLowEndDevice && (
            <g className="neural-signals">
              {animatedConnections.map((conn, idx) => {
                const depthStyle = getDepthStyles(Math.min(conn.from.depthLayer, conn.to.depthLayer));
                
                return (
                  <circle
                    key={`signal-${conn.id}`}
                    r={1.5 * depthStyle.scale}
                    fill="#00d4ff"
                    opacity={depthStyle.opacity * 0.8}
                    style={{
                      offsetPath: `path('M ${conn.from.x} ${conn.from.y} L ${conn.to.x} ${conn.to.y}')`,
                      animation: `signalMove 3s ease-in-out ${conn.delay + idx * 0.2}s infinite`,
                    }}
                  >
                    <animate
                      attributeName="cx"
                      values={`${conn.from.x}%;${conn.to.x}%`}
                      dur="3s"
                      begin={`${conn.delay}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values={`${conn.from.y}%;${conn.to.y}%`}
                      dur="3s"
                      begin={`${conn.delay}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values={`0;${depthStyle.opacity * 0.8};0`}
                      dur="3s"
                      begin={`${conn.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>
          )}

          {/* Static nodes - no individual animations */}
          <g className="neural-nodes">
            {nodes.map((node) => {
              const depthStyle = getDepthStyles(node.depthLayer);
              const nodeSize = 2 + node.depthLayer * 1.2;
              const isAccent = node.layer % 3 === 0;
              
              return (
                <circle
                  key={node.id}
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={nodeSize}
                  fill={isAccent ? "#00d4ff" : "hsl(var(--portfolio-accent))"}
                  opacity={depthStyle.opacity * 0.6}
                  filter="url(#nodeGlow)"
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
