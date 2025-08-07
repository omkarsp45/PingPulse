import { NextRequest, NextResponse } from 'next/server';
import { generateStatusHistory } from '@/lib/mock-data';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const historyData = generateStatusHistory(params.id);
  
  return NextResponse.json(historyData);
}