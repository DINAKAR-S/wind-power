'use client';

import { useState, useEffect } from 'react';
import { HorizonSlider } from '@/components/HorizonSlider';
import { DateRangePicker } from '@/components/DateRangePicker';
import { ForecastChart } from '@/components/ForecastChart';
import { Wind, Clock, BarChart3, Info } from 'lucide-react';
import { format, subDays } from 'date-fns';

export default function Home() {
  const [horizon, setHorizon] = useState(4);
  const [startDate, setStartDate] = useState('2024-01-01T00:00');
  const [endDate, setEndDate] = useState('2024-01-02T00:00');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/wind-data?horizon=${horizon}&start=${startDate}&end=${endDate}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh every minute for monitoring feature
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [horizon, startDate, endDate]);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            National Historical Forecast
          </h1>
          <div className="h-[1px] bg-slate-200 w-full mb-8"></div>
        </header>

        {/* Controls Grid - Styled to match screenshot */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Time:</label>
                <input
                  type="datetime-local"
                  step="1800"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">End Time:</label>
                <input
                  type="datetime-local"
                  step="1800"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Forecast Horizon: {horizon}h</label>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              step="1"
              value={horizon}
              onChange={(e) => setHorizon(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Main Visualization */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Generation vs. Forecast
            </h2>
            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                {error}
              </div>
            )}
          </div>
          <ForecastChart data={data} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
