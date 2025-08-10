export interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  createdAt: string;
}

export interface ResponseTimeData {
  timestamp: string;
  responseTime: number;
  status: 'up' | 'down' | 'checking';
}

export interface StatusHistory {
  date: string;
  status: 'up' | 'down' | 'checking';
  uptime: number;
  incidents: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}