
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FileUploader from '@/components/uploader/FileUploader';
import CryptoTerminal from '@/components/terminal/CryptoTerminal';
import AlgorithmCard from '@/components/dashboard/AlgorithmCard';
import DataFlowDiagram from '@/components/dashboard/DataFlowDiagram';
import FeatureVisualizer from '@/components/dashboard/FeatureVisualizer';
import DataTable from '@/components/dashboard/DataTable';
import { detectAlgorithm, extractFeatures } from '@/services/cryptoDetectionService';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SampleDataGenerator from '@/components/demo/SampleDataGenerator';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DetectPage = () => {
  const [inputData, setInputData] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [stage, setStage] = useState<number>(0);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<any | null>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const [parsedData, setParsedData] = useState<Record<string, any>[] | null>(null);
  
  const handleDataUpload = async (data: string, fileType: string) => {
    try {
      // Reset state
      setInputData(data);
      setFileType(fileType);
      setStage(0);
      setDetectionResults(null);
      setTerminalOutput(null);
      setParsedData(null);
      
      // Parse data based on file type
      parseFileData(data, fileType);
      
      // Stage 1: Extracting features
      setTimeout(() => {
        setStage(1);
        try {
          const extractedFeatures = extractFeatures(data);
          
          // Stage 2: Running model
          setTimeout(() => {
            setStage(2);
            
            // Stage 3: Processing results
            detectAlgorithm(extractedFeatures)
              .then((results) => {
                setTimeout(() => {
                  setStage(3);
                  setDetectionResults(results);
                  setFeatures(results.features);
                  
                  const topAlgorithm = results.algorithms[0];
                  setTerminalOutput(`Identified algorithm: ${topAlgorithm.name} (${topAlgorithm.confidence.toFixed(1)}% confidence)`);
                  toast.success(`Algorithm identification complete: ${topAlgorithm.name}`);
                }, 500);
              });
          }, 1000);
        } catch (error) {
          toast.error('Error processing data. Please check your input.');
          console.error(error);
        }
      }, 500);
    } catch (error) {
      toast.error('Failed to process the data');
      console.error(error);
    }
  };

  const parseFileData = (data: string, fileType: string) => {
    try {
      switch(fileType.toLowerCase()) {
        case 'csv':
          const rows = data.split('\n');
          const headers = rows[0].split(',');
          const parsedCsv = rows.slice(1).map(row => {
            const values = row.split(',');
            const rowData: Record<string, any> = {};
            headers.forEach((header, index) => {
              rowData[header] = values[index];
            });
            return rowData;
          });
          setParsedData(parsedCsv);
          break;
        case 'json':
          const jsonData = JSON.parse(data);
          setParsedData(Array.isArray(jsonData) ? jsonData : [jsonData]);
          break;
        default:
          // For binary/encrypted data, create a simple bytes view
          const bytes = Array.from(new TextEncoder().encode(data)).slice(0, 1000);
          const byteChunks: Record<string, any>[] = [];
          for (let i = 0; i < bytes.length; i += 8) {
            byteChunks.push({
              offset: `0x${i.toString(16).padStart(4, '0')}`,
              b0: bytes[i]?.toString(16).padStart(2, '0') || '',
              b1: bytes[i+1]?.toString(16).padStart(2, '0') || '',
              b2: bytes[i+2]?.toString(16).padStart(2, '0') || '',
              b3: bytes[i+3]?.toString(16).padStart(2, '0') || '',
              b4: bytes[i+4]?.toString(16).padStart(2, '0') || '',
              b5: bytes[i+5]?.toString(16).padStart(2, '0') || '',
              b6: bytes[i+6]?.toString(16).padStart(2, '0') || '',
              b7: bytes[i+7]?.toString(16).padStart(2, '0') || '',
            });
          }
          setParsedData(byteChunks);
      }
    } catch (error) {
      console.error('Error parsing file data:', error);
      // Create a fallback byte view
      const bytes = Array.from(new TextEncoder().encode(data)).slice(0, 1000);
      const byteChunks: Record<string, any>[] = [];
      for (let i = 0; i < bytes.length; i += 16) {
        const chunk: Record<string, any> = { offset: `0x${i.toString(16).padStart(4, '0')}` };
        for (let j = 0; j < 16; j++) {
          if (i + j < bytes.length) {
            chunk[`b${j}`] = bytes[i+j].toString(16).padStart(2, '0');
          }
        }
        byteChunks.push(chunk);
      }
      setParsedData(byteChunks);
    }
  };
  
  // Handle data from the sample generator
  const handleSampleDataGenerated = (data: string, algorithm: string) => {
    handleDataUpload(data, 'bin');
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Crypto Algorithm Detection</h1>
        <p className="text-cyber-foreground mt-2">
          Upload encrypted data to identify the cryptographic algorithm used for encryption
        </p>
      </div>
      
      {/* Introduction Card */}
      <Card className="cyber-card mb-6">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-cyber-accent/20 p-3 rounded-full">
              <Info className="h-6 w-6 text-cyber-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">How Crypto Algorithm Detection Works</h2>
              <p className="text-cyber-foreground mb-4">
                This tool uses AI to analyze patterns in encrypted data and determine which cryptographic algorithm was likely used. 
                Follow these simple steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-cyber-foreground">
                <li><span className="font-bold text-cyber-accent">Upload Data:</span> Use the uploader below to submit your encrypted file.</li>
                <li><span className="font-bold text-cyber-accent">Review Preview:</span> See a preview of your data in the Data Preview section.</li>
                <li><span className="font-bold text-cyber-accent">Monitor Progress:</span> Watch the Analysis Pipeline and Terminal for live updates.</li>
                <li><span className="font-bold text-cyber-accent">View Results:</span> See the detected algorithms with confidence levels and features analysis.</li>
              </ol>
              <p className="mt-4 text-cyber-foreground">
                Don't have encrypted data to test? Use the Sample Data Generator at the bottom of this page to create test data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Card className="cyber-card h-full">
            <CardHeader>
              <CardTitle className="text-lg text-cyber-foreground">Upload Encrypted Data</CardTitle>
              <CardDescription className="text-cyber-foreground/70">
                Upload your encrypted file to begin algorithm detection (accepts .txt, .bin, .csv, .json, and more)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader onDataUpload={handleDataUpload} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <CryptoTerminal 
            input={inputData || undefined} 
            output={terminalOutput || undefined} 
          />
        </div>
      </div>
      
      <div className="mb-6">
        <Card className="cyber-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-cyber-foreground">Analysis Pipeline</CardTitle>
                <CardDescription className="text-cyber-foreground/70">
                  Follow the progress of your data through the detection system
                </CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-6 w-6 rounded-full bg-cyber-secondary flex items-center justify-center cursor-help">
                      <Info size={14} className="text-cyber-accent" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-cyber-secondary border border-cyber-highlight text-cyber-foreground max-w-xs">
                    <p>This pipeline shows the four stages your data goes through during analysis:
                      <br/>1. Input - Your data is received and prepared
                      <br/>2. Features - Statistical properties are extracted
                      <br/>3. Model - AI analyzes the patterns
                      <br/>4. Results - Final detection is produced
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <DataFlowDiagram stage={stage} />
          </CardContent>
        </Card>
      </div>

      {parsedData && parsedData.length > 0 && (
        <div className="mb-6">
          <DataTable 
            data={parsedData} 
            caption={fileType === 'csv' ? 'CSV Data Preview' : fileType === 'json' ? 'JSON Data Preview' : 'Data Bytes Preview'}
            maxRows={5}
            fileType={fileType || undefined}
          />
        </div>
      )}
      
      {detectionResults && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Card className="cyber-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-cyber-foreground">Feature Analysis</CardTitle>
                      <CardDescription className="text-cyber-foreground/70">
                        Key statistical properties extracted from your data
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="h-6 w-6 rounded-full bg-cyber-secondary flex items-center justify-center cursor-help">
                            <Info size={14} className="text-cyber-accent" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-secondary border border-cyber-highlight text-cyber-foreground max-w-xs">
                          <p>These charts show the statistical features extracted from your data, like entropy, byte frequency, and pattern distribution. Taller bars indicate more prominent features that helped identify the algorithm.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  <FeatureVisualizer features={features} />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="cyber-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-cyber-foreground">Detection Results</CardTitle>
                      <CardDescription className="text-cyber-foreground/70">
                        Identified cryptographic algorithms ranked by confidence level
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="h-6 w-6 rounded-full bg-cyber-secondary flex items-center justify-center cursor-help">
                            <Info size={14} className="text-cyber-accent" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-secondary border border-cyber-highlight text-cyber-foreground max-w-xs">
                          <p>These are the most likely encryption algorithms used in your data. Higher confidence percentages indicate stronger matches. The highest confidence algorithm is highlighted.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
          </div>
        </>
      )}

      <div className="mb-6">
        <Card className="cyber-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-cyber-foreground">Sample Data Generator</CardTitle>
                <CardDescription className="text-cyber-foreground/70">
                  Create encrypted test data with known algorithms to see how the detection works
                </CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-6 w-6 rounded-full bg-cyber-secondary flex items-center justify-center cursor-help">
                      <Info size={14} className="text-cyber-accent" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-cyber-secondary border border-cyber-highlight text-cyber-foreground max-w-xs">
                    <p>Use this tool to generate sample encrypted data for testing. Select an algorithm, data size and content type to create test data that will be automatically analyzed.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <SampleDataGenerator onDataGenerated={handleSampleDataGenerated} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DetectPage;
