"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import {
  ArrowLeft,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Settings,
  Zap,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThemeToggle } from '../../../components/theme-toggle';

interface UptimeData {
  time: string;
  responseTime: number;
  status: 'up' | 'down';
}

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

export default function WebsiteDetail() {
  const params = useParams();
  const router = useRouter();
  const websiteId = params.id as string;

  const [website, setWebsite] = useState<Website | null>(null);
  const [uptimeData, setUptimeData] = useState<UptimeData[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockWebsite: Website = {
        id: websiteId,
        name: 'My Portfolio',
        url: 'https://myportfolio.com',
        status: 'up',
        uptime: 99.9,
        responseTime: 245,
        lastChecked: '2 minutes ago'
      };

      // Generate mock uptime data for last 30 minutes (10 data points, 3 minutes apart)
      const mockUptimeData: UptimeData[] = [];
      const now = new Date();

      for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3 * 60 * 1000);
        const responseTime = Math.floor(Math.random() * 200) + 150; // 150-350ms
        const status = Math.random() > 0.1 ? 'up' : 'down'; // 90% uptime

        mockUptimeData.push({
          time: time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          responseTime: status === 'up' ? responseTime : 0,
          status
        });
      }

      setWebsite(mockWebsite);
      setUptimeData(mockUptimeData);
      setLoading(false);
    }, 1000);
  }, [websiteId]);

  // Simulate real-time updates every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newDataPoint: UptimeData = {
        time: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        responseTime: Math.floor(Math.random() * 200) + 150,
        status: Math.random() > 0.1 ? 'up' : 'down'
      };

      setUptimeData(prev => [...prev.slice(1), newDataPoint]);

      // Update website status
      if (website) {
        setWebsite(prev => prev ? {
          ...prev,
          status: newDataPoint.status,
          responseTime: newDataPoint.responseTime,
          lastChecked: 'Just now'
        } : null);
      }
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, [website]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading website details...</p>
        </div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Website Not Found</h2>
          <p className="text-muted-foreground mb-4">The website you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'down':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'checking':
        return <Clock className="w-6 h-6 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'down':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'checking':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const upCount = uptimeData.filter(d => d.status === 'up').length;
  const uptimePercentage = (upCount / uptimeData.length) * 100;
  const avgResponseTime = uptimeData
    .filter(d => d.status === 'up')
    .reduce((acc, d) => acc + d.responseTime, 0) / upCount || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PingPulse</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Website Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            {getStatusIcon(website.status)}
            <div>
              <h1 className="text-3xl font-bold">{website.name}</h1>
              <p className="text-muted-foreground">{website.url}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(website.status)}`}>
              {website.status.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Last checked: {website.lastChecked} • Monitoring every 3 minutes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                <p className={`text-2xl font-bold ${website.status === 'up' ? 'text-green-500' :
                  website.status === 'down' ? 'text-red-500' : 'text-yellow-500'
                  }`}>
                  {website.status === 'up' ? 'Online' :
                    website.status === 'down' ? 'Offline' : 'Checking'}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">30min Uptime</p>
                <p className="text-2xl font-bold">{uptimePercentage.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">{avgResponseTime.toFixed(0)}ms</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Response Time Chart */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Response Time (Last 30 Minutes)</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Offline</span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="time"
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    props.payload.status === 'up' ? `${value}ms` : 'Offline',
                    'Response Time'
                  ]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={payload.status === 'up' ? '#10b981' : '#ef4444'}
                        stroke={payload.status === 'up' ? '#10b981' : '#ef4444'}
                        strokeWidth={2}
                      />
                    );
                  }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Checks */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Recent Checks</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {uptimeData.slice().reverse().map((check, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    {check.status === 'up' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm">{check.time}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {check.status === 'up' ? `${check.responseTime}ms` : 'Failed'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${check.status === 'up'
                      ? 'text-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'text-red-500 bg-red-50 dark:bg-red-900/20'
                      }`}>
                      {check.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}