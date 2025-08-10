import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate mock status history data for the last 30 days
  const historyData = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const uptime = Math.random() > 0.05 ? 100 : Math.random() * 50 + 50;
    const incidents = uptime < 100 ? Math.floor(Math.random() * 3) + 1 : 0;
    
    historyData.push({
      date: date.toISOString().split('T')[0],
      status: uptime === 100 ? 'up' : 'down',
      uptime,
      incidents,
    });
  }
  
  return NextResponse.json(historyData);
}