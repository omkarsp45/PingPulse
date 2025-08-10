'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '@/types';
import Cookies from 'js-cookie';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (token) {
      // For now, we'll set a basic user from the token
      // In a real app, you'd decode the JWT to get user info
      setUser({
        id: '1',
        email: 'user@example.com',
        name: 'User',
      });
    }
    setLoading(false);
  }, []);

  const signup = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = {
          id: '1', // We'll get this from the JWT token in a real app
          email,
          name: email.split('@')[0], // Use email prefix as name
        };

        setUser(user);
        Cookies.set('auth-token', data.token, { expires: 7 });
        setLoading(false);
        return true;
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = {
          id: '1', // We'll get this from the JWT token in a real app
          email,
          name: email.split('@')[0], // Use email prefix as name
        };

        setUser(user);
        Cookies.set('auth-token', data.token, { expires: 7 });
        setLoading(false);
        return true;
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('auth-token');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}