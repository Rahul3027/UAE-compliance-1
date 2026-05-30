'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  description: string;
  details?: string[];
}

interface FlowDiagramProps {
  nodes: DiagramNode[];
  highlightColor?: string;
}

export function FlowDiagram({ nodes, highlightColor = '#dcb24c' }: FlowDiagramProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="space-y-6">
      {/* Visual Diagram */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 p-6 bg-panelLight/10 border border-borderLight rounded-2xl overflow-hidden">
        {/* Connection line for desktop */}
        <div className="absolute top-[42px] left-[10%] right-[10%] h-[1px] bg-borderLight hidden md:block z-0" />
        
        {nodes.map((node, idx) => {
          const isActive = idx === activeIdx;
          const isPassed = idx < activeIdx;

          return (
            <div key={node.id} className="relative z-10 flex flex-col items-center flex-1 w-full text-center md:max-w-[160px]">
              {/* Node Button */}
              <button
                onClick={() => setActiveIdx(idx)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all font-mono font-bold text-sm ${
                  isActive
                    ? 'bg-bg border-accent text-accent shadow-[0_0_12px_rgba(220,178,76,0.2)]'
                    : isPassed
                    ? 'bg-accent/10 border-accent/40 text-accent/80'
                    : 'bg-bg border-borderLight text-textSecondary hover:border-textSecondary/60'
                }`}
              >
                {node.id}
                
                {/* Active pulse */}
                {isActive && (
                  <motion.div
                    layoutId="pulse"
                    className="absolute -inset-1.5 rounded-full border border-accent/30 z-[-1]"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                )}
              </button>

              {/* Node Metadata */}
              <div className="mt-3 space-y-0.5">
                <p className={`text-xs font-semibold ${isActive ? 'text-textPrimary font-bold' : 'text-textSecondary'}`}>
                  {node.label}
                </p>
                {node.sublabel && (
                  <p className="text-[10px] text-textSecondary/60 font-mono uppercase tracking-wider">{node.sublabel}</p>
                )}
              </div>

              {/* Mobile connector line */}
              {idx < nodes.length - 1 && (
                <div className="w-[1px] h-6 bg-borderLight md:hidden my-2" />
              )}
            </div>
          );
        })}
      </div>

      {/* Info card describing the active node */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="apple-panel p-5 space-y-4"
      >
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
            Active Node Detail
          </span>
          <h4 className="text-base font-semibold mt-2 text-textPrimary">
            {nodes[activeIdx].label} ({nodes[activeIdx].id})
          </h4>
          <p className="text-xs text-textSecondary mt-1 leading-relaxed">
            {nodes[activeIdx].description}
          </p>
        </div>

        {nodes[activeIdx].details && nodes[activeIdx].details!.length > 0 && (
          <div className="border-t border-borderLight pt-3 space-y-2">
            <p className="text-[11px] font-semibold text-textPrimary uppercase tracking-wider">Technical Functions:</p>
            <ul className="grid sm:grid-cols-2 gap-2 font-mono">
              {nodes[activeIdx].details!.map((detail, dIdx) => (
                <li key={dIdx} className="text-xs text-textSecondary flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
