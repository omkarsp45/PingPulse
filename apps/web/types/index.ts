export interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'warning';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  createdAt: string;
}

export interface ResponseTimeData {
  timestamp: string;
  responseTime: number;
  status: 'up' | 'down' | 'warning';
}

export interface StatusHistory {
  date: string;
  status: 'up' | 'down' | 'warning';
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
  logout: () => void;
  loading: boolean;
}