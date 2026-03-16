import { NextRequest, NextResponse } from 'next/server';
import { fetchActualWindGeneration, fetchWindForecasts } from '@/lib/bmrsClient';
import { processForecastData } from '@/lib/forecastProcessor';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const horizon = parseInt(searchParams.get('horizon') || '4', 10);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!start || !end) {
    return NextResponse.json({ error: 'Missing start or end parameters' }, { status: 400 });
  }

  try {
    // 1. Fetch both datasets in parallel
    const [actuals, forecasts] = await Promise.all([
      fetchActualWindGeneration(start, end),
      fetchWindForecasts(start, end),
    ]);

    // 2. Process and merge
    const result = processForecastData(actuals, forecasts, horizon);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
