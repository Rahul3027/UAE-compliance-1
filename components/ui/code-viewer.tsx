'use client';
import { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';

interface XmlSegment {
  id: string;
  title: string;
  range: string;
  description: string;
  businessTerm: string;
  schematronRule?: string;
  codeSnippet: string;
}

interface CodeViewerProps {
  segments: XmlSegment[];
}

export function CodeViewer({ segments }: CodeViewerProps) {
  const [selectedSegId, setSelectedSegId] = useState<string>(segments[0]?.id || '');
  const activeSeg = segments.find(s => s.id === selectedSegId) || segments[0];

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 items-start font-mono">
      {/* Interactive XML Segment Buttons */}
      <div className="space-y-3 font-sans">
        <div className="flex items-center justify-between px-2 pb-1 border-b border-borderLight">
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">UBL XML Segments</span>
          <span className="text-[10px] text-accent font-mono">Select a section to inspect</span>
        </div>

        <div className="space-y-1">
          {segments.map((seg) => {
            const isSelected = seg.id === selectedSegId;
            return (
              <button
                key={seg.id}
                onClick={() => setSelectedSegId(seg.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'border-accent bg-accent/[0.03] text-textPrimary font-semibold'
                    : 'border-borderLight bg-panelLight/20 text-textSecondary hover:bg-panelLight/40'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-semibold">{seg.title}</span>
                  <span className="text-[10px] font-mono text-textSecondary opacity-80">{seg.range}</span>
                </div>
                <pre className="text-[10px] text-textSecondary/60 font-mono truncate max-w-md mt-1">
                  {seg.codeSnippet.split('\n')[0]} ...
                </pre>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Inspector Panel */}
      <div className="space-y-4 font-sans">
        <div className="apple-panel p-5 space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
              Compliance Inspector
            </span>
            <h4 className="text-base font-semibold text-textPrimary mt-3">
              {activeSeg.title}
            </h4>
            <p className="text-xs text-textSecondary mt-2 leading-relaxed">
              {activeSeg.description}
            </p>
          </div>

          <div className="space-y-3 border-t border-borderLight pt-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 bg-accent/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3 h-3 text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-textSecondary">PINT AE Business Term</p>
                <p className="text-xs font-semibold text-textPrimary mt-0.5">{activeSeg.businessTerm}</p>
              </div>
            </div>

            {activeSeg.schematronRule && (
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-red-500/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <HelpCircle className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-textSecondary">Schematron Validation Rule</p>
                  <code className="text-[11px] text-red-400 block font-mono mt-0.5 bg-red-950/20 p-1.5 rounded border border-red-900/20">
                    {activeSeg.schematronRule}
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Snippet Display */}
        <div className="rounded-xl border border-borderLight bg-codeBg overflow-hidden">
          <div className="bg-codeHeaderBg px-4 py-2 border-b border-borderLight flex justify-between items-center">
            <span className="text-[10px] font-mono text-textSecondary">UBL XML Code Block</span>
            <button 
              onClick={() => navigator.clipboard.writeText(activeSeg.codeSnippet)}
              className="text-[10px] text-accent hover:underline"
            >
              Copy
            </button>
          </div>
          <pre className="p-4 overflow-auto text-[11px] font-mono text-codeText leading-relaxed max-h-[300px]">
            <code>{activeSeg.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
