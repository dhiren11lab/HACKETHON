
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface SampleDataGeneratorProps {
  onDataGenerated: (data: string, algorithm: string) => void;
}

// Mock encrypted data (in real application, this would use actual encryption functions)
const generateMockEncryptedData = (algorithm: string, length: number): string => {
  let bytes = '';
  const getCryptoAlgorithmBytes = (algorithm: string, length: number) => {
    // This is just a simulation for demo purposes
    // In a real app, you would use actual crypto libraries to generate real encrypted data
    const rand = new Uint8Array(length);
    
    if (algorithm === 'aes') {
      // AES tends to produce very random output with uniform distribution
      for (let i = 0; i < length; i++) {
        rand[i] = Math.floor(Math.random() * 256);
      }
    } else if (algorithm === 'des') {
      // DES might have some patterns due to smaller block size
      for (let i = 0; i < length; i++) {
        rand[i] = Math.floor(Math.random() * 256);
        // Add some bias to simulate DES characteristics
        if (i % 8 === 0 && i > 0) {
          rand[i] = (rand[i-8] + rand[i]) % 256; // Create slight correlation with previous block
        }
      }
    } else if (algorithm === 'rsa') {
      // RSA encrypted data often has PKCS padding patterns
      for (let i = 0; i < length; i++) {
        if (i < 2) {
          rand[i] = 0; // First bytes often 0 in RSA PKCS
        } else {
          rand[i] = Math.floor(Math.random() * 256);
        }
      }
    } else if (algorithm === 'blowfish') {
      // Blowfish simulation
      for (let i = 0; i < length; i++) {
        rand[i] = Math.floor(Math.random() * 256);
        // Simulate Blowfish's variable pattern
        if (i % 8 === 0) {
          rand[i] = rand[i] % 200; // Create biased distribution in block starts
        }
      }
    }
    
    return Array.from(rand).map(byte => String.fromCharCode(byte)).join('');
  };
  
  bytes = getCryptoAlgorithmBytes(algorithm, length);
  return btoa(bytes); // Base64 encode for safe display
};

const SampleDataGenerator: React.FC<SampleDataGeneratorProps> = ({ onDataGenerated }) => {
  const [algorithm, setAlgorithm] = useState<string>('aes');
  const [dataSize, setDataSize] = useState<number>(64);
  
  const handleGenerate = () => {
    try {
      const data = generateMockEncryptedData(algorithm, dataSize);
      onDataGenerated(data, algorithm);
      toast.success(`Generated sample ${algorithm.toUpperCase()} encrypted data`);
    } catch (error) {
      toast.error('Failed to generate sample data');
      console.error(error);
    }
  };
  
  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-lg text-cyber-foreground">Sample Data Generator</CardTitle>
        <CardDescription>Create sample encrypted data for testing the model</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-cyber-foreground">Algorithm</label>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="bg-cyber border-cyber-highlight">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent className="bg-cyber-secondary border-cyber-highlight">
              <SelectItem value="aes">AES</SelectItem>
              <SelectItem value="des">DES</SelectItem>
              <SelectItem value="rsa">RSA</SelectItem>
              <SelectItem value="blowfish">Blowfish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-cyber-foreground">Data Size (bytes)</label>
          <Input
            type="number"
            min={16}
            max={1024}
            value={dataSize}
            onChange={e => setDataSize(parseInt(e.target.value) || 64)}
            className="bg-cyber border-cyber-highlight"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerate} 
          className="w-full bg-cyber-secondary hover:bg-cyber-highlight text-cyber-accent border border-cyber-accent"
        >
          Generate Sample Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SampleDataGenerator;
