
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lock, Info, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AlgorithmCardProps {
  name: string;
  confidence: number;
  isMatch: boolean;
  description: string;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ name, confidence, isMatch, description }) => {
  // Generate a more detailed explanation based on confidence level
  const getConfidenceExplanation = () => {
    if (confidence > 85) {
      return "Very high confidence - this is almost certainly the correct algorithm.";
    } else if (confidence > 70) {
      return "High confidence - this is likely the correct algorithm.";
    } else if (confidence > 50) {
      return "Moderate confidence - this could be the correct algorithm.";
    } else {
      return "Low confidence - this is less likely to be the correct algorithm.";
    }
  };

  return (
    <Card className={`cyber-card transition-all duration-300 ${isMatch ? 'border-cyber-accent shadow-[0_0_15px_rgba(100,255,218,0.3)]' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-mono flex items-center gap-2">
          <Lock size={16} className={isMatch ? 'text-cyber-accent' : 'text-cyber-foreground'} />
          {name}
          {isMatch && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs bg-cyber-accent/20 text-cyber-accent px-2 py-0.5 rounded-full">
                    Top Match
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-cyber-secondary border border-cyber-highlight text-cyber-foreground">
                  <p>This is the most likely algorithm based on our analysis</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        <span className={`text-sm font-semibold ${isMatch ? 'text-cyber-accent' : 'text-cyber-foreground'}`}>
          {confidence.toFixed(1)}%
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-cyber-foreground/70">Confidence Level:</span>
            <span className="text-xs font-semibold text-cyber-foreground">{getConfidenceExplanation()}</span>
          </div>
          
          <Progress
            value={confidence}
            className={`h-2 w-full ${isMatch ? 'bg-cyber-highlight' : 'bg-muted'}`}
          />
          
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className={`mt-0.5 flex-shrink-0 ${isMatch ? 'text-cyber-accent' : 'text-cyber-foreground/70'}`} />
            <p className="text-xs text-cyber-foreground">{description}</p>
          </div>

          {isMatch && (
            <Alert className="bg-cyber-accent/5 border-cyber-accent/20 mt-2">
              <AlertDescription className="text-xs text-cyber-accent">
                What this means: Your data shows distinctive patterns of the {name} algorithm. 
                This is the most likely encryption method used on your data.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-start gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-4 w-4 rounded-full bg-cyber-secondary/80 flex items-center justify-center cursor-help flex-shrink-0 mt-0.5">
                    <Info size={10} className="text-cyber-accent" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-cyber-secondary border border-cyber-highlight text-cyber-foreground max-w-xs">
                  <p className="font-semibold mb-1">What does this mean?</p>
                  <p className="mb-2">A higher confidence percentage indicates a stronger match between your data and this algorithm's typical patterns.</p>
                  <p>This analysis is based on statistical properties and patterns found in your data that are characteristic of specific encryption algorithms.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs italic text-cyber-foreground/70">
              Hover for more information about this analysis
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmCard;
