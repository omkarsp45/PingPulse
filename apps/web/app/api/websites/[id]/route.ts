import { NextRequest, NextResponse } from 'next/server';
import { mockWebsites } from '@/lib/mock-data';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const website = mockWebsites.find(w => w.id === params.id);
  
  if (!website) {
    return NextResponse.json(
      { error: 'Website not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(website);
}