'use client';

import React from 'react';

interface DateRangePickerProps {
  start: string;
  end: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  start,
  end,
  onStartChange,
  onEndChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
      <div className="flex flex-col gap-1 flex-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Start Time</label>
        <input
          type="datetime-local"
          step="1800"
          value={start}
          onChange={(e) => onStartChange(e.target.value)}
          className="bg-slate-800 text-white border border-slate-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all w-full"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">End Time</label>
        <input
          type="datetime-local"
          step="1800"
          value={end}
          onChange={(e) => onEndChange(e.target.value)}
          className="bg-slate-800 text-white border border-slate-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all w-full"
        />
      </div>
    </div>
  );
};
