import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch response times data which includes historical status
    const response = await fetch(`${API_BASE_URL}/website/response-times/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch status history' }, { status: response.status });
    }

    const data = await response.json();
    
    // Transform response times data to status history format
    const historyData = [];
    const now = new Date();
    const responseTimes = data.responseTimes || [];
    
    // Group by date and calculate uptime
    const dateGroups = responseTimes.reduce((acc: any, item: any) => {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { total: 0, up: 0 };
      }
      acc[date].total++;
      if (item.status === 'Up') {
        acc[date].up++;
      }
      return acc;
    }, {});
    
    for (let i = 9; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split('T')[0];
      const dayData = dateGroups[dateKey];
      
      let uptime = 100;
      let incidents = 0;
      let status = 'up';
      
      if (dayData) {
        uptime = (dayData.up / dayData.total) * 100;
        incidents = dayData.total - dayData.up;
        status = uptime === 100 ? 'up' : 'down';
      }
      
      historyData.push({
        date: dateKey,
        status,
        uptime: Math.round(uptime * 100) / 100,
        incidents,
      });
    }
    
    return NextResponse.json(historyData);
  } catch (error) {
    console.error('Error fetching status history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}