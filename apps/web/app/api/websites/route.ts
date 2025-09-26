import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Warn in server logs if running on Vercel but still pointing to localhost (will always fail in production)
if (process.env.VERCEL && API_BASE_URL.includes('localhost')) {
  console.warn('[api/websites] WARNING: API_BASE_URL resolves to localhost on Vercel. Set NEXT_PUBLIC_API_URL to your deployed API URL.');
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let upstream: Response;
    try {
      upstream = await fetch(`${API_BASE_URL}/website`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // Avoid caching stale site list
        cache: 'no-store'
      });
    } catch (netErr) {
      console.error('[api/websites] Network error contacting upstream', API_BASE_URL, netErr);
      return NextResponse.json({ error: 'Upstream API unreachable. Check NEXT_PUBLIC_API_URL.' }, { status: 502 });
    }

    if (!upstream.ok) {
      let bodyText: string | undefined;
      try { bodyText = await upstream.text(); } catch {}
      console.error('[api/websites] Upstream non-OK', upstream.status, bodyText);
      return NextResponse.json({ error: 'Upstream API error', status: upstream.status }, { status: upstream.status });
    }

    // Try parse JSON safely
    let raw: any;
    try {
      raw = await upstream.json();
    } catch (parseErr) {
      console.error('[api/websites] Failed to parse upstream JSON', parseErr);
      return NextResponse.json({ error: 'Invalid upstream response' }, { status: 502 });
    }

    // Accept either array or { websites: [...] }
    const websites = Array.isArray(raw) ? raw : (raw?.websites ?? []);
    return NextResponse.json(websites);
  } catch (error) {
    console.error('[api/websites] Unexpected handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(`${API_BASE_URL}/website`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        name: name || url, // Use URL as fallback if name not provided
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Failed to create website' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating website:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}