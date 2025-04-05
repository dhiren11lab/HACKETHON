
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface Feature {
  name: string;
  value: number;
  importance: number;
}

interface FeatureVisualizerProps {
  features: Feature[];
}

const FeatureVisualizer: React.FC<FeatureVisualizerProps> = ({ features }) => {
  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-lg text-cyber-foreground">Feature Analysis</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={features}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          >
            <XAxis type="number" stroke="#8892b0" />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#8892b0"
              tick={{ fill: '#8892b0', fontFamily: 'JetBrains Mono' }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#112240',
                borderColor: '#233554',
                color: '#8892b0',
                fontFamily: 'JetBrains Mono',
              }}
              formatter={(value: any) => [`${value}`, '']}
              labelFormatter={() => ''}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {features.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.importance > 0.5 ? '#64ffda' : '#8892b0'}
                  fillOpacity={0.7 + entry.importance * 0.3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FeatureVisualizer;
