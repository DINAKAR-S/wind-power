'use client';

import React from 'react';

interface HorizonSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const HorizonSlider: React.FC<HorizonSliderProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-300">Forecast Horizon</label>
        <span className="text-lg font-bold text-emerald-400">{value} Hours</span>
      </div>
      <input
        type="range"
        min="0"
        max="48"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>0h</span>
        <span>12h</span>
        <span>24h</span>
        <span>36h</span>
        <span>48h</span>
      </div>
    </div>
  );
};
