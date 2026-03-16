'use client';

import { useState, useEffect } from 'react';
import { Wind, Clock, BarChart3, Info } from 'lucide-react';
import { format } from 'date-fns';
import { HorizonSlider } from '@/components/HorizonSlider';
import { ForecastChart } from '@/components/ForecastChart';

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
    <main className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Wind className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                UK Wind Power Forecast
              </h1>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl">
              National-level wind power generation monitoring and accuracy analysis using Elexon BMRS datasets.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-500 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4" />
            <span>Market Data Refresh: 1m Interval</span>
          </div>
        </header>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Start Time</label>
                <input
                  type="datetime-local"
                  step="1800"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">End Time</label>
                <input
                  type="datetime-local"
                  step="1800"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>
          <div>
            <HorizonSlider 
              value={horizon} 
              onChange={setHorizon} 
            />
          </div>
        </div>

        {/* Main Visualization */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Generation vs. Forecast (Jan 2024 Focus)
            </h2>
            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                {error}
              </div>
            )}
          </div>
          <ForecastChart data={data} isLoading={isLoading} />
        </div>

        {/* Info / Legend Footer */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 p-8 bg-slate-900/20 rounded-3xl border border-white/5">
          <section>
            <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Logic Definition
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We select the latest forecast issued at least <strong>{horizon} hours</strong> prior to each target measurement. 
              Gaps in lines indicate missing forecast data points as per technical requirements.
            </p>
          </section>
          <section>
            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Data Source
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Historical analysis data focused on <strong>January 2024</strong>. 
              Integrated with live Elexon BMRS streams for real-time monitoring.
            </p>
          </section>
        </footer>
      </div>
    </main>
  );
}
