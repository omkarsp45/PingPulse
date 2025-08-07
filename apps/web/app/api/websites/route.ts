import { NextRequest, NextResponse } from 'next/server';
import { mockWebsites } from '@/lib/mock-data';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(mockWebsites);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url } = body;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new website object
    const newWebsite = {
      id: Date.now().toString(),
      name,
      url,
      status: 'up' as const,
      uptime: 100,
      responseTime: Math.floor(Math.random() * 300) + 100,
      lastCheck: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // In a real app, you'd save this to a database
    mockWebsites.push(newWebsite);

    return NextResponse.json(newWebsite, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create website' },
      { status: 500 }
    );
  }
}