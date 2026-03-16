import { FuelGeneration, WindForecast } from './bmrsClient';

export interface MergedData {
  targetTime: string;
  actual?: number;
  forecast?: number;
}

export function processForecastData(
  actuals: FuelGeneration[],
  forecasts: WindForecast[],
  horizonHours: number
): MergedData[] {
  // Group forecasts by target startTime
  const forecastMap = new Map<string, WindForecast[]>();
  
  forecasts.forEach((f) => {
    if (!forecastMap.has(f.startTime)) {
      forecastMap.set(f.startTime, []);
    }
    forecastMap.get(f.startTime)!.push(f);
  });

  // Create a combined set of all startTimes (Actuals + Forecasts)
  const allStartTimes = new Set<string>();
  actuals.forEach((a) => allStartTimes.add(a.startTime));
  forecasts.forEach((f) => allStartTimes.add(f.startTime));

  const sortedTimes = Array.from(allStartTimes).sort();

  const results: MergedData[] = sortedTimes.map((time) => {
    const targetTime = new Date(time);
    const horizonMillis = horizonHours * 60 * 60 * 1000;
    const deadline = new Date(targetTime.getTime() - horizonMillis);

    // Find the latest forecast published before or at the deadline
    const availableForecasts = forecastMap.get(time) || [];
    const validForecasts = availableForecasts.filter(
      (f) => new Date(f.publishTime) <= deadline
    );

    // Get the latest one
    let selectedForecast: WindForecast | undefined;
    if (validForecasts.length > 0) {
      selectedForecast = validForecasts.reduce((latest, current) => {
        return new Date(current.publishTime) > new Date(latest.publishTime) ? current : latest;
      });
    }

    const actual = actuals.find((a) => a.startTime === time)?.generation;

    return {
      targetTime: time,
      actual,
      forecast: selectedForecast?.generation,
    };
  });

  // Filter out points where we have NEITHER actual NOR forecast
  // (Instructions say: "If forecast data is missing, do not plot that point" - this usually means for that specific line,
  // but let's just return what we have and let the frontend handle nulls if it wants to connect lines, 
  // or we filter out if BOTH are missing.)
  return results.filter(d => d.actual !== undefined || d.forecast !== undefined);
}
