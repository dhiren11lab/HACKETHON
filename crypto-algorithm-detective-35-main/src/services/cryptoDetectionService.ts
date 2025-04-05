
// This is a mock service that simulates the crypto detection functionality
// In a real implementation, this would call a backend API or use WebAssembly to run the ML model

export interface CryptoFeatures {
  length: number;
  entropy: number;
  byte_mean: number;
  byte_std: number;
  byte_max: number;
  byte_min: number;
  zero_bytes: number;
}

export interface FeatureWithImportance {
  name: string;
  value: number;
  importance: number;
}

export interface DetectionResult {
  algorithms: {
    name: string;
    confidence: number;
    isMatch: boolean;
    description: string;
  }[];
  features: FeatureWithImportance[];
}

const algorithmDescriptions = {
  AES: "Advanced Encryption Standard - Block cipher with 128/192/256-bit keys. Highly secure symmetric algorithm.",
  DES: "Data Encryption Standard - Legacy block cipher with 56-bit keys. Vulnerable to brute force attacks.",
  RSA: "Rivest-Shamir-Adleman - Public-key cryptosystem widely used for secure data transmission.",
  Blowfish: "Symmetric block cipher with variable key length. Designed as a fast, free alternative to DES."
};

// Mock extract features function - in real world this would do actual feature extraction
export const extractFeatures = (data: string): CryptoFeatures => {
  // Try to determine if this is base64 data
  let byteArray: Uint8Array;
  
  try {
    // Check if it's base64 encoded
    try {
      const byteString = atob(data);
      byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
    } catch (e) {
      // Not base64, use TextEncoder
      byteArray = new TextEncoder().encode(data);
    }
  } catch (e) {
    // Fallback to simple string encoding
    byteArray = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      byteArray[i] = data.charCodeAt(i);
    }
  }
  
  // Calculate basic statistics
  let sum = 0;
  let sumSquares = 0;
  let zeroCount = 0;
  let max = 0;
  let min = 255;
  
  const byteCounts = new Array(256).fill(0);
  
  for (let i = 0; i < byteArray.length; i++) {
    const byte = byteArray[i];
    sum += byte;
    sumSquares += byte * byte;
    if (byte === 0) zeroCount++;
    if (byte > max) max = byte;
    if (byte < min) min = byte;
    byteCounts[byte]++;
  }
  
  const mean = sum / byteArray.length;
  const variance = sumSquares / byteArray.length - mean * mean;
  const std = Math.sqrt(variance);
  
  // Calculate entropy
  let entropy = 0;
  for (let i = 0; i < 256; i++) {
    const p = byteCounts[i] / byteArray.length;
    if (p > 0) {
      entropy -= p * Math.log2(p);
    }
  }
  
  return {
    length: byteArray.length,
    entropy,
    byte_mean: mean,
    byte_std: std,
    byte_max: max,
    byte_min: min,
    zero_bytes: zeroCount
  };
};

// Mock detection function that simulates an ML model
export const detectAlgorithm = (features: CryptoFeatures, knownAlgorithm?: string): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // This is a simplified mock logic - in a real app, this would use an actual ML model
      const entropyWeight = 0.4;
      const meanWeight = 0.2;
      const stdWeight = 0.2;
      const zeroWeight = 0.1;
      const minMaxWeight = 0.1;
      
      // Simplified characteristic ranges for different algorithms (in a real app, these would be learned by the model)
      const aesScore = 
        entropyWeight * (features.entropy > 7.8 ? 0.9 : 0.5) +
        meanWeight * (Math.abs(features.byte_mean - 127) < 10 ? 0.9 : 0.5) +
        stdWeight * (features.byte_std > 70 ? 0.9 : 0.5) +
        zeroWeight * (features.zero_bytes < features.length / 50 ? 0.9 : 0.5) +
        minMaxWeight * (features.byte_min < 10 && features.byte_max > 240 ? 0.9 : 0.5);
        
      const desScore = 
        entropyWeight * (features.entropy > 7.2 && features.entropy < 7.9 ? 0.9 : 0.5) +
        meanWeight * (Math.abs(features.byte_mean - 120) < 20 ? 0.9 : 0.5) +
        stdWeight * (features.byte_std > 60 && features.byte_std < 75 ? 0.9 : 0.5) +
        zeroWeight * (features.zero_bytes < features.length / 40 ? 0.9 : 0.5) +
        minMaxWeight * (features.byte_min < 20 && features.byte_max > 230 ? 0.9 : 0.5);
        
      const rsaScore = 
        entropyWeight * (features.entropy < 7.7 ? 0.9 : 0.5) +
        meanWeight * (features.byte_mean > 100 ? 0.9 : 0.6) +
        stdWeight * (features.byte_std < 65 ? 0.9 : 0.5) +
        zeroWeight * (features.zero_bytes > features.length / 30 ? 0.9 : 0.5) +
        minMaxWeight * (features.byte_min === 0 ? 0.9 : 0.5);
        
      const blowfishScore =
        entropyWeight * (features.entropy > 7.6 && features.entropy < 7.95 ? 0.9 : 0.5) +
        meanWeight * (Math.abs(features.byte_mean - 110) < 30 ? 0.9 : 0.6) +
        stdWeight * (features.byte_std > 65 && features.byte_std < 80 ? 0.9 : 0.5) +
        zeroWeight * (features.zero_bytes < features.length / 35 ? 0.9 : 0.5) +
        minMaxWeight * (features.byte_min < 15 ? 0.9 : 0.5);
      
      // Normalize to probabilities (this is very simplified)
      const total = aesScore + desScore + rsaScore + blowfishScore;
      const aesProb = (aesScore / total) * 100;
      const desProb = (desScore / total) * 100;
      const rsaProb = (rsaScore / total) * 100;
      const blowfishProb = (blowfishScore / total) * 100;
      
      // Handle case where we know the algorithm (used for the sample data generator)
      if (knownAlgorithm) {
        // Boost the known algorithm
        let boostFactor = 1.2;
        if (knownAlgorithm === 'aes') {
          const algorithms = [
            { name: "AES", confidence: Math.min(aesProb * boostFactor, 98), isMatch: true, description: algorithmDescriptions.AES },
            { name: "Blowfish", confidence: blowfishProb / 1.5, isMatch: false, description: algorithmDescriptions.Blowfish },
            { name: "DES", confidence: desProb / 1.8, isMatch: false, description: algorithmDescriptions.DES },
            { name: "RSA", confidence: rsaProb / 2, isMatch: false, description: algorithmDescriptions.RSA },
          ];
          resolve({
            algorithms,
            features: getFeatureImportance(features)
          });
          return;
        } else if (knownAlgorithm === 'des') {
          const algorithms = [
            { name: "DES", confidence: Math.min(desProb * boostFactor, 96), isMatch: true, description: algorithmDescriptions.DES },
            { name: "Blowfish", confidence: blowfishProb / 1.3, isMatch: false, description: algorithmDescriptions.Blowfish },
            { name: "AES", confidence: aesProb / 1.5, isMatch: false, description: algorithmDescriptions.AES },
            { name: "RSA", confidence: rsaProb / 2, isMatch: false, description: algorithmDescriptions.RSA },
          ];
          resolve({
            algorithms,
            features: getFeatureImportance(features)
          });
          return;
        } else if (knownAlgorithm === 'rsa') {
          const algorithms = [
            { name: "RSA", confidence: Math.min(rsaProb * boostFactor, 95), isMatch: true, description: algorithmDescriptions.RSA },
            { name: "DES", confidence: desProb / 1.5, isMatch: false, description: algorithmDescriptions.DES },
            { name: "AES", confidence: aesProb / 1.7, isMatch: false, description: algorithmDescriptions.AES },
            { name: "Blowfish", confidence: blowfishProb / 1.8, isMatch: false, description: algorithmDescriptions.Blowfish },
          ];
          resolve({
            algorithms,
            features: getFeatureImportance(features)
          });
          return;
        } else if (knownAlgorithm === 'blowfish') {
          const algorithms = [
            { name: "Blowfish", confidence: Math.min(blowfishProb * boostFactor, 97), isMatch: true, description: algorithmDescriptions.Blowfish },
            { name: "AES", confidence: aesProb / 1.4, isMatch: false, description: algorithmDescriptions.AES },
            { name: "DES", confidence: desProb / 1.5, isMatch: false, description: algorithmDescriptions.DES },
            { name: "RSA", confidence: rsaProb / 2, isMatch: false, description: algorithmDescriptions.RSA },
          ];
          resolve({
            algorithms,
            features: getFeatureImportance(features)
          });
          return;
        }
      }
      
      // Regular detection (no known algorithm)
      const algorithms = [
        { name: "AES", confidence: aesProb, isMatch: aesProb > 40, description: algorithmDescriptions.AES },
        { name: "DES", confidence: desProb, isMatch: desProb > 40, description: algorithmDescriptions.DES },
        { name: "RSA", confidence: rsaProb, isMatch: rsaProb > 40, description: algorithmDescriptions.RSA },
        { name: "Blowfish", confidence: blowfishProb, isMatch: blowfishProb > 40, description: algorithmDescriptions.Blowfish }
      ].sort((a, b) => b.confidence - a.confidence);
      
      // Ensure at least one match if confidence is high enough
      if (!algorithms.some(a => a.isMatch) && algorithms[0].confidence > 35) {
        algorithms[0].isMatch = true;
      }
      
      resolve({
        algorithms,
        features: getFeatureImportance(features)
      });
    }, 1500); // Simulate processing delay
  });
};

// Helper function to convert features to visualization format with feature importance
const getFeatureImportance = (features: CryptoFeatures): FeatureWithImportance[] => {
  return [
    {
      name: "Entropy",
      value: parseFloat(features.entropy.toFixed(2)),
      importance: 0.9
    },
    {
      name: "Mean",
      value: parseFloat(features.byte_mean.toFixed(2)),
      importance: 0.75
    },
    {
      name: "Std Dev",
      value: parseFloat(features.byte_std.toFixed(2)),
      importance: 0.7
    },
    {
      name: "Max Value",
      value: features.byte_max,
      importance: 0.3
    },
    {
      name: "Min Value",
      value: features.byte_min,
      importance: 0.3
    },
    {
      name: "Zero Bytes",
      value: features.zero_bytes,
      importance: 0.5
    },
    {
      name: "Length",
      value: features.length,
      importance: 0.2
    }
  ];
};
