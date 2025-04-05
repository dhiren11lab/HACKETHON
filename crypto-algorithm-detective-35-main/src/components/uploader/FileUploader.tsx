
import React, { useState } from 'react';
import { Upload, X, FileSpreadsheet, FileText, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FileUploaderProps {
  onDataUpload: (data: string, fileType: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onDataUpload }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    
    setFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
        onDataUpload(result, fileExtension);
      }
    };
    reader.onerror = () => {
      toast.error('Error reading file');
    };
    
    reader.readAsText(file);
  };
  
  const clearFile = () => {
    setFile(null);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch(extension) {
      case 'csv':
        return <FileSpreadsheet size={16} className="mr-1 text-green-400" />;
      case 'json':
        return <Database size={16} className="mr-1 text-blue-400" />;
      case 'txt':
      case 'bin':
      case 'hex':
      case 'dat':
        return <FileText size={16} className="mr-1 text-yellow-400" />;
      default:
        return <FileText size={16} className="mr-1" />;
    }
  };
  
  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-md h-48 flex flex-col items-center justify-center p-4 transition-colors
          ${dragActive ? 'border-cyber-accent bg-cyber-accent/10' : 'border-cyber-highlight'}
          ${file ? 'bg-cyber-secondary/60' : ''}
        `}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          accept=".txt,.bin,.hex,.dat,.csv,.json,.xlsx"
        />
        
        {file ? (
          <div className="text-center">
            <div className="font-mono text-sm mb-2 text-cyber-accent flex items-center justify-center">
              {getFileIcon(file.name)}
              {file.name}
            </div>
            <div className="text-xs text-cyber-foreground">{(file.size / 1024).toFixed(2)} KB</div>
            <Button
              variant="ghost" 
              size="sm" 
              onClick={clearFile}
              className="mt-2 text-cyber-foreground hover:text-white hover:bg-cyber-highlight/50"
            >
              <X size={16} className="mr-1" /> Remove
            </Button>
          </div>
        ) : (
          <>
            <Upload size={24} className="text-cyber-foreground mb-2" />
            <p className="text-sm mb-2">Drag & drop encrypted data file</p>
            <p className="text-xs text-cyber-foreground mb-4">or</p>
            <label htmlFor="file-upload">
              <Button variant="outline" size="sm" className="text-cyber-foreground border-cyber-highlight hover:bg-cyber-highlight/30">
                Browse Files
              </Button>
            </label>
            <p className="text-xs text-cyber-foreground/70 mt-4">
              Accepts .txt, .bin, .hex, .dat, .csv, .json, .xlsx (max 5MB)
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
