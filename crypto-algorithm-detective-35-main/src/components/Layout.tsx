
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Database, BarChart3, Terminal, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-cyber cyber-grid">
      <header className="border-b border-cyber-highlight bg-cyber-secondary/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-cyber-accent" />
            <h1 className="text-xl font-bold text-white">
              Crypto <span className="text-cyber-accent">Algorithm</span> Detective
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="flex items-center gap-2 text-cyber-foreground hover:text-cyber-accent transition-colors">
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/detect" className="flex items-center gap-2 text-cyber-foreground hover:text-cyber-accent transition-colors">
                  <Terminal size={16} />
                  <span>Detect</span>
                </Link>
              </li>
              <li>
                <Link to="/datasets" className="flex items-center gap-2 text-cyber-foreground hover:text-cyber-accent transition-colors">
                  <Database size={16} />
                  <span>Datasets</span>
                </Link>
              </li>
              <li>
                <Link to="/visualize" className="flex items-center gap-2 text-cyber-foreground hover:text-cyber-accent transition-colors">
                  <BarChart3 size={16} />
                  <span>Visualize</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        {children}
      </main>
      
      <footer className="bg-cyber-secondary/80 backdrop-blur-sm border-t border-cyber-highlight mt-auto">
        <div className="container mx-auto p-4 text-center text-sm text-cyber-foreground">
          <p>© 2025 Crypto Algorithm Detective | Cybersecurity Research Tool</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
