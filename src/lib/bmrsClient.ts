const BASE_URL = 'https://data.elexon.co.uk/bmrs/api/v1';

export interface FuelGeneration {
  startTime: string;
  generation: number;
  fuelType: string;
}

export interface WindForecast {
  startTime: string;
  publishTime: string;
  generation: number;
}

export async function fetchActualWindGeneration(start: string, end: string): Promise<FuelGeneration[]> {
  const url = `${BASE_URL}/datasets/FUELHH/stream?startTimeFrom=${start}&startTimeTo=${end}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch actual generation: ${response.statusText}`);
  }
  const data: FuelGeneration[] = await response.json();
  // Filter for WIND as per instructions
  return data.filter((d) => d.fuelType === 'WIND');
}

export async function fetchWindForecasts(start: string, end: string): Promise<WindForecast[]> {
  // We need to fetch forecasts that TARGET the start/end range.
  // WINDFOR stream supports startTimeFrom/startTimeTo.
  const url = `${BASE_URL}/datasets/WINDFOR/stream?startTimeFrom=${start}&startTimeTo=${end}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch wind forecasts: ${response.statusText}`);
  }
  return await response.json();
}
