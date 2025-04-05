
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SampleDataGenerator from '@/components/demo/SampleDataGenerator';
import AlgorithmCard from '@/components/dashboard/AlgorithmCard';
import FeatureVisualizer from '@/components/dashboard/FeatureVisualizer';
import CryptoTerminal from '@/components/terminal/CryptoTerminal';
import { detectAlgorithm, extractFeatures } from '@/services/cryptoDetectionService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DatasetsPage = () => {
  const [generatedData, setGeneratedData] = useState<string | null>(null);
  const [knownAlgorithm, setKnownAlgorithm] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<any | null>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  
  const handleDataGenerated = async (data: string, algorithm: string) => {
    setGeneratedData(data);
    setKnownAlgorithm(algorithm);
    
    try {
      // Extract features
      const extractedFeatures = extractFeatures(data);
      
      // Run detection with known algorithm hint
      const results = await detectAlgorithm(extractedFeatures, algorithm);
      setDetectionResults(results);
      setFeatures(results.features);
      
      const topAlgorithm = results.algorithms[0];
      setTerminalOutput(`Generated ${algorithm.toUpperCase()} data. Detected: ${topAlgorithm.name} (${topAlgorithm.confidence.toFixed(1)}% confidence)`);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Crypto Datasets</h1>
        <p className="text-cyber-foreground mt-2">
          Generate and analyze sample encrypted data from various algorithms
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <SampleDataGenerator onDataGenerated={handleDataGenerated} />
        </div>
        
        <div className="md:col-span-2">
          <CryptoTerminal 
            input={generatedData || undefined} 
            output={terminalOutput || undefined} 
          />
        </div>
      </div>
      
      {detectionResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-lg text-cyber-foreground">Detection Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {detectionResults.algorithms.map((algo: any, index: number) => (
                    <AlgorithmCard 
                      key={index}
                      name={algo.name}
                      confidence={algo.confidence}
                      isMatch={algo.isMatch}
                      description={algo.description}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <FeatureVisualizer features={features} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DatasetsPage;
