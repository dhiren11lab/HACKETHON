
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CryptoTerminalProps {
  input?: string;
  output?: string;
}

const CryptoTerminal: React.FC<CryptoTerminalProps> = ({ input, output }) => {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '> Crypto Algorithm Detective v1.0',
    '> Initializing detection engine...',
    '> Ready for input data'
  ]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (input) {
      addTerminalLine(`> Input received [${input.length} bytes]`);
      addTerminalLine(`> Starting analysis...`);
    }
  }, [input]);
  
  useEffect(() => {
    if (output) {
      addTerminalLine(`> Analysis complete`);
      addTerminalLine(`> ${output}`);
    }
  }, [output]);
  
  const addTerminalLine = (line: string) => {
    setTerminalHistory(prev => [...prev, line]);
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 10);
  };
  
  const clearTerminal = () => {
    setTerminalHistory([
      '> Crypto Algorithm Detective v1.0',
      '> Terminal cleared',
      '> Ready for input data'
    ]);
  };
  
  return (
    <Card className="cyber-card h-full">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <div>
          <CardTitle className="text-sm font-mono text-cyber-foreground">Analysis Terminal</CardTitle>
          <CardDescription className="text-xs text-cyber-foreground/70">
            Real-time updates of the detection process
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-6 w-6 rounded-full bg-cyber-secondary flex items-center justify-center cursor-help">
                  <Info size={14} className="text-cyber-accent" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-cyber-secondary border border-cyber-highlight text-cyber-foreground max-w-xs">
                <p>This terminal shows real-time progress as the system analyzes your data and tries to identify the encryption algorithm used.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="ghost" size="sm" onClick={clearTerminal} className="h-6 w-6 p-0">
            <X size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={terminalRef}
          className="cyber-terminal h-64 overflow-auto"
        >
          {terminalHistory.map((line, i) => (
            <div key={i} className={`mb-1 ${line.includes('complete') ? 'text-cyber-accent' : ''}`}>
              {line}
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoTerminal;
