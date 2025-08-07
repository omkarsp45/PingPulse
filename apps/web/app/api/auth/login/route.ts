import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app, verify against database
    if (email === 'user@example.com' && password === 'password') {
      const token = jwt.sign(
        { userId: '1', email },
        'mock-secret-key',
        { expiresIn: '7d' }
      );

      const user = {
        id: '1',
        email,
        name: 'John Doe',
      };

      return NextResponse.json({ token, user });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}