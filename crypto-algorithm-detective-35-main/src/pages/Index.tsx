
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle, Database, BarChart3, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="text-cyber-accent">Crypto</span> Algorithm Detective
          </h1>
          <p className="text-xl text-cyber-foreground max-w-2xl mx-auto">
            Identify cryptographic algorithms from encrypted data using advanced AI/ML techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-12">
          <Card className="cyber-card hover:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all">
            <CardContent className="p-6 flex flex-col h-full">
              <Shield className="h-12 w-12 text-cyber-accent mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-white">Identify Unknown Algorithms</h2>
              <p className="text-cyber-foreground mb-6 flex-grow">
                Upload encrypted data samples and let our AI-powered model detect the cryptographic algorithm used.
              </p>
              <Link to="/detect" className="mt-auto">
                <Button className="w-full bg-cyber-secondary hover:bg-cyber-highlight text-cyber-accent border border-cyber-accent">
                  Start Detection <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="cyber-card hover:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all">
            <CardContent className="p-6 flex flex-col h-full">
              <AlertCircle className="h-12 w-12 text-cyber-accent mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-white">Test with Sample Data</h2>
              <p className="text-cyber-foreground mb-6 flex-grow">
                Generate sample encrypted data from known algorithms to test and evaluate the detection model.
              </p>
              <Link to="/datasets" className="mt-auto">
                <Button className="w-full bg-cyber-secondary hover:bg-cyber-highlight text-cyber-accent border border-cyber-accent">
                  Generate Samples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <Card className="cyber-card hover:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all">
            <CardContent className="p-6 flex flex-col h-full">
              <Database className="h-12 w-12 text-cyber-accent mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-white">Browse Dataset</h2>
              <p className="text-cyber-foreground mb-6 flex-grow">
                Explore sample encrypted datasets generated from various cryptographic algorithms.
              </p>
              <Link to="/datasets" className="mt-auto">
                <Button className="w-full bg-cyber-secondary hover:bg-cyber-highlight text-cyber-accent border border-cyber-accent">
                  View Datasets <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="cyber-card hover:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all">
            <CardContent className="p-6 flex flex-col h-full">
              <BarChart3 className="h-12 w-12 text-cyber-accent mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-white">Visualize Features</h2>
              <p className="text-cyber-foreground mb-6 flex-grow">
                See how the ML model extracts and analyzes features from encrypted data to make predictions.
              </p>
              <Link to="/visualize" className="mt-auto">
                <Button className="w-full bg-cyber-secondary hover:bg-cyber-highlight text-cyber-accent border border-cyber-accent">
                  Explore Features <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
          <p className="text-cyber-foreground mb-6">
            Our crypto algorithm detective uses machine learning techniques to analyze encrypted data and identify the 
            underlying algorithm. By extracting statistical features and patterns in the encrypted output, the model 
            can differentiate between common cryptographic algorithms like AES, DES, RSA, and Blowfish.
          </p>
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-cyber-accent/20 border border-cyber-accent flex items-center justify-center text-cyber-accent mb-2">
                1
              </div>
              <p className="text-xs text-center text-cyber-foreground">Upload Data</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-cyber-accent/20 border border-cyber-accent flex items-center justify-center text-cyber-accent mb-2">
                2
              </div>
              <p className="text-xs text-center text-cyber-foreground">Extract Features</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-cyber-accent/20 border border-cyber-accent flex items-center justify-center text-cyber-accent mb-2">
                3
              </div>
              <p className="text-xs text-center text-cyber-foreground">Analyze Patterns</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-cyber-accent/20 border border-cyber-accent flex items-center justify-center text-cyber-accent mb-2">
                4
              </div>
              <p className="text-xs text-center text-cyber-foreground">Identify Algorithm</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
