
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataFlowDiagramProps {
  stage: number; // 0: ready, 1: analyzing, 2: completed
}

const DataFlowDiagram: React.FC<DataFlowDiagramProps> = ({ stage }) => {
  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-lg text-cyber-foreground">Analysis Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${stage >= 0 ? 'text-cyber-accent' : 'text-cyber-foreground/40'}`}>
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
              ${stage >= 0 ? 'border-cyber-accent bg-cyber-accent/10' : 'border-cyber-foreground/40'}`}>
              <span className="text-lg font-mono">1</span>
            </div>
            <span className="text-xs mt-2">Input</span>
          </div>

          <div className={`w-16 h-0.5 ${stage >= 1 ? 'bg-cyber-accent' : 'bg-cyber-foreground/40'} relative`}>
            {stage === 1 && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-2 bg-cyber-glow animate-data-flow" />
              </div>
            )}
          </div>

          <div className={`flex flex-col items-center ${stage >= 1 ? 'text-cyber-accent' : 'text-cyber-foreground/40'}`}>
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
              ${stage >= 1 ? 'border-cyber-accent bg-cyber-accent/10' : 'border-cyber-foreground/40'}`}>
              <span className="text-lg font-mono">2</span>
            </div>
            <span className="text-xs mt-2">Features</span>
          </div>

          <div className={`w-16 h-0.5 ${stage >= 2 ? 'bg-cyber-accent' : 'bg-cyber-foreground/40'} relative`}>
            {stage === 2 && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-2 bg-cyber-glow animate-data-flow" />
              </div>
            )}
          </div>

          <div className={`flex flex-col items-center ${stage >= 2 ? 'text-cyber-accent' : 'text-cyber-foreground/40'}`}>
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
              ${stage >= 2 ? 'border-cyber-accent bg-cyber-accent/10' : 'border-cyber-foreground/40'}`}>
              <span className="text-lg font-mono">3</span>
            </div>
            <span className="text-xs mt-2">Model</span>
          </div>

          <div className={`w-16 h-0.5 ${stage >= 3 ? 'bg-cyber-accent' : 'bg-cyber-foreground/40'} relative`}>
            {stage === 3 && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-2 bg-cyber-glow animate-data-flow" />
              </div>
            )}
          </div>

          <div className={`flex flex-col items-center ${stage >= 3 ? 'text-cyber-accent' : 'text-cyber-foreground/40'}`}>
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
              ${stage >= 3 ? 'border-cyber-accent bg-cyber-accent/10' : 'border-cyber-foreground/40'}`}>
              <span className="text-lg font-mono">4</span>
            </div>
            <span className="text-xs mt-2">Results</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataFlowDiagram;
