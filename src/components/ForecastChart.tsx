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

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  if (!payload.value) return null;
  const date = new Date(payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="middle" fill="#94a3b8" fontSize={10}>
        <tspan x={0} dy="1em">{format(date, 'MMM dd')}</tspan>
        <tspan x={0} dy="1.2em" fill="#e2e8f0" fontWeight="500">{format(date, 'HH:mm')}</tspan>
      </text>
    </g>
  );
};

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

  return (
    <div className="w-full h-[500px] p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="targetTime" 
            stroke="#94a3b8" 
            tick={<CustomTick />}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={12}
            tickFormatter={(val) => `${val / 1000}k`}
            label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft', fill: '#94a3b8', offset: 0 }} 
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
