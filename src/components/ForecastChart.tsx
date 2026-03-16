'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface ForecastChartProps {
  data: any[];
  isLoading: boolean;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-500">
        No data available for the selected range.
      </div>
    );
  }

  // Format time for XAxis
  const formattedData = data.map((d) => ({
    ...d,
    displayTime: format(new Date(d.targetTime), 'MMM dd, HH:mm'),
  }));

  return (
    <div className="w-full h-[500px] p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="displayTime" 
            stroke="#94a3b8" 
            fontSize={12}
            tickMargin={10}
            label={{ value: 'Target Time End (UTC)', position: 'bottom', offset: 0, fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={12}
            tickFormatter={(val) => `${val / 1000}k`}
            label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
            itemStyle={{ fontSize: '13px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            name="Actual Generation"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            name="Forecast Generation"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
