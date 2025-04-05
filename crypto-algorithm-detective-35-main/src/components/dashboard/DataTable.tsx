
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DataTableProps {
  data: Record<string, any>[];
  caption?: string;
  maxRows?: number;
  fileType?: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, caption = "Sample Data", maxRows = 5, fileType }) => {
  if (!data || data.length === 0) return null;
  
  const columns = Object.keys(data[0]);
  const displayData = data.slice(0, maxRows);
  
  return (
    <Card className="cyber-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-cyber-foreground">Data Preview</CardTitle>
            <CardDescription className="text-cyber-foreground/70">
              This shows a small sample of the uploaded {fileType && fileType.toUpperCase()} data
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
                <p>
                  {fileType === 'csv' 
                    ? 'CSV (Comma-Separated Values) data displayed as rows and columns'
                    : fileType === 'json'
                    ? 'JSON (JavaScript Object Notation) data displayed in table format'
                    : 'Binary data shown as hexadecimal bytes, grouped in 8-byte chunks'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md overflow-hidden border border-cyber-highlight">
          <Table>
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
              <TableRow className="bg-cyber-secondary">
                {columns.map((column) => (
                  <TableHead key={column} className="text-cyber-accent font-mono">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((row, i) => (
                <TableRow key={i} className="even:bg-cyber-secondary/30">
                  {columns.map((column) => (
                    <TableCell 
                      key={`${i}-${column}`} 
                      className="font-mono text-xs text-cyber-foreground"
                    >
                      {typeof row[column] === 'object' 
                        ? JSON.stringify(row[column]).substring(0, 30) 
                        : String(row[column]).substring(0, 30)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.length > maxRows && (
          <p className="text-xs text-cyber-foreground mt-2">
            Showing {maxRows} of {data.length} rows
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
