
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis, LineChart, Line } from 'recharts';

// Sample data for visualization
const algorithmsComparisonData = [
  { algorithm: 'AES', entropy: 7.99, randomness: 98, complexity: 95, blockSize: 128 },
  { algorithm: 'DES', entropy: 7.4, randomness: 75, complexity: 70, blockSize: 64 },
  { algorithm: 'RSA', entropy: 7.2, randomness: 90, complexity: 92, blockSize: 1024 },
  { algorithm: 'Blowfish', entropy: 7.8, randomness: 92, complexity: 85, blockSize: 64 },
];

const featureImportanceData = [
  { name: 'Entropy', importance: 90 },
  { name: 'Byte Distribution', importance: 85 },
  { name: 'Standard Deviation', importance: 78 },
  { name: 'Zero Bytes', importance: 67 },
  { name: 'Min/Max Values', importance: 63 },
  { name: 'Byte Mean', importance: 72 },
  { name: 'Data Length', importance: 40 },
];

const byteDistributionData = {
  AES: Array(16).fill(0).map((_, i) => ({ range: `${i*16}-${(i+1)*16-1}`, count: 70 + Math.floor(Math.random() * 40) })),
  DES: Array(16).fill(0).map((_, i) => ({ range: `${i*16}-${(i+1)*16-1}`, count: 30 + Math.floor(Math.random() * 100) })),
  RSA: Array(16).fill(0).map((_, i) => ({ range: `${i*16}-${(i+1)*16-1}`, count: i < 2 ? 250 : 60 + Math.floor(Math.random() * 40) })),
  Blowfish: Array(16).fill(0).map((_, i) => ({ range: `${i*16}-${(i+1)*16-1}`, count: (i % 2 === 0) ? 60 + Math.floor(Math.random() * 40) : 90 + Math.floor(Math.random() * 40) })),
};

const radarData = [
  {
    algorithm: 'AES',
    entropy: 95,
    uniformity: 90,
    correlation: 20,
    pattern: 15,
    zeros: 35,
    repetition: 10,
  },
  {
    algorithm: 'DES',
    entropy: 82,
    uniformity: 75,
    correlation: 30,
    pattern: 35,
    zeros: 40,
    repetition: 25,
  },
  {
    algorithm: 'RSA',
    entropy: 85,
    uniformity: 65,
    correlation: 45,
    pattern: 30,
    zeros: 60,
    repetition: 20,
  },
  {
    algorithm: 'Blowfish',
    entropy: 90,
    uniformity: 85,
    correlation: 25,
    pattern: 20,
    zeros: 30,
    repetition: 15,
  },
];

const scatterData = [
  { name: 'AES', entropy: 7.99, uniformity: 92, z: 200 },
  { name: 'DES', entropy: 7.4, uniformity: 79, z: 200 },
  { name: 'RSA', entropy: 7.2, uniformity: 65, z: 200 },
  { name: 'Blowfish', entropy: 7.8, uniformity: 85, z: 200 },
  { name: 'Unknown 1', entropy: 7.92, uniformity: 90, z: 100 },
  { name: 'Unknown 2', entropy: 7.3, uniformity: 75, z: 100 },
  { name: 'Unknown 3', entropy: 7.1, uniformity: 60, z: 100 },
  { name: 'Unknown 4', entropy: 7.85, uniformity: 88, z: 100 },
];

const VisualizePage = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState<string>('AES');
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Feature Visualization</h1>
        <p className="text-cyber-foreground mt-2">
          Explore and visualize the features that help identify cryptographic algorithms
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg text-cyber-foreground">Algorithm Comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={algorithmsComparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
                <XAxis dataKey="algorithm" stroke="#8892b0" />
                <YAxis stroke="#8892b0" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#112240', 
                    borderColor: '#233554',
                    color: '#8892b0'
                  }} 
                />
                <Legend />
                <Bar dataKey="entropy" name="Entropy" fill="#64ffda" />
                <Bar dataKey="randomness" name="Randomness" fill="#05d9e8" />
                <Bar dataKey="complexity" name="Complexity" fill="#7a40f2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg text-cyber-foreground">Feature Importance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureImportanceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
                <XAxis type="number" stroke="#8892b0" />
                <YAxis type="category" dataKey="name" stroke="#8892b0" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#112240', 
                    borderColor: '#233554',
                    color: '#8892b0'
                  }} 
                />
                <Legend />
                <Bar dataKey="importance" name="Importance %" fill="#64ffda" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="cyber-card mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-cyber-foreground">Algorithm Feature Profiles</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid stroke="#233554" />
              <PolarAngleAxis dataKey="algorithm" stroke="#8892b0" />
              <PolarRadiusAxis stroke="#8892b0" angle={90} />
              <Radar name="AES" dataKey="entropy" stroke="#64ffda" fill="#64ffda" fillOpacity={0.5} />
              <Radar name="AES" dataKey="uniformity" stroke="#05d9e8" fill="#05d9e8" fillOpacity={0.5} />
              <Radar name="AES" dataKey="correlation" stroke="#7a40f2" fill="#7a40f2" fillOpacity={0.3} />
              <Radar name="AES" dataKey="pattern" stroke="#f038ff" fill="#f038ff" fillOpacity={0.3} />
              <Radar name="AES" dataKey="zeros" stroke="#fa6e79" fill="#fa6e79" fillOpacity={0.3} />
              <Radar name="AES" dataKey="repetition" stroke="#fbff12" fill="#fbff12" fillOpacity={0.3} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#112240', 
                  borderColor: '#233554',
                  color: '#8892b0'
                }} 
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg text-cyber-foreground">Algorithm Clustering</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
                <XAxis 
                  type="number" 
                  dataKey="entropy" 
                  name="Entropy" 
                  stroke="#8892b0" 
                  domain={[7.0, 8.0]} 
                  label={{ value: "Entropy", position: "bottom", fill: "#8892b0" }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="uniformity" 
                  name="Uniformity" 
                  stroke="#8892b0" 
                  label={{ value: "Uniformity", angle: -90, position: "left", fill: "#8892b0" }} 
                />
                <ZAxis type="number" dataKey="z" range={[60, 200]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#112240', 
                    borderColor: '#233554',
                    color: '#8892b0'
                  }} 
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend />
                <Scatter name="Known Algorithms" data={scatterData.filter(d => d.z === 200)} fill="#64ffda" />
                <Scatter name="Unknown Samples" data={scatterData.filter(d => d.z === 100)} fill="#05d9e8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg text-cyber-foreground">Byte Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="AES" onValueChange={setActiveAlgorithm}>
              <TabsList className="bg-cyber-highlight/50 mb-2">
                <TabsTrigger value="AES">AES</TabsTrigger>
                <TabsTrigger value="DES">DES</TabsTrigger>
                <TabsTrigger value="RSA">RSA</TabsTrigger>
                <TabsTrigger value="Blowfish">Blowfish</TabsTrigger>
              </TabsList>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={byteDistributionData[activeAlgorithm as keyof typeof byteDistributionData]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
                    <XAxis dataKey="range" stroke="#8892b0" />
                    <YAxis stroke="#8892b0" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#112240', 
                        borderColor: '#233554',
                        color: '#8892b0'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      name="Byte Count" 
                      stroke="#64ffda" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VisualizePage;
