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
    <div className="w-full h-[600px] mt-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
          <CartesianGrid strokeDasharray="1 1" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="targetTime" 
            stroke="#64748b" 
            fontSize={11}
            tickMargin={15}
            tickFormatter={(time) => {
              const date = new Date(time);
              return `${format(date, 'HH:mm')}\n${format(date, 'dd/MM/yy')}`;
            }}
            label={{ value: 'Target Time End (UTC)', position: 'bottom', offset: 40, fill: '#475569', fontSize: 14 }}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={11}
            tickFormatter={(value) => `${value / 1000}k`}
            label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft', offset: -10, fill: '#475569', fontSize: 14 }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
            name="Actual"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
            name="Forecast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
