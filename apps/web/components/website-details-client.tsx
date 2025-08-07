'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Website, ResponseTimeData, StatusHistory } from '@/types';
import { StatusBadge } from '@/components/status-badge';
import { ResponseChart } from '@/components/response-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ExternalLink, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import Link from 'next/link';

interface WebsiteDetailsClientProps {
  websiteId: string;
}

export function WebsiteDetailsClient({ websiteId }: WebsiteDetailsClientProps) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [website, setWebsite] = useState<Website | null>(null);
  const [responseData, setResponseData] = useState<ResponseTimeData[]>([]);
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      fetchWebsiteData();
    }
  }, [user, authLoading, router, websiteId]);

  const fetchWebsiteData = async () => {
    try {
      const [websiteRes, responseRes, historyRes] = await Promise.all([
        fetch(`/api/websites/${websiteId}`),
        fetch(`/api/websites/${websiteId}/response-times`),
        fetch(`/api/websites/${websiteId}/status-history`),
      ]);

      if (websiteRes.ok) {
        const websiteData = await websiteRes.json();
        setWebsite(websiteData);
      }

      if (responseRes.ok) {
        const responseData = await responseRes.json();
        setResponseData(responseData);
      }

      if (historyRes.ok) {
        const historyData = await historyRes.json();
        setStatusHistory(historyData);
      }
    } catch (error) {
      console.error('Failed to fetch website data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton className="h-10 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-80" />
                <Skeleton className="h-64" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48" />
                <Skeleton className="h-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !website) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Website Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {website.name}
                </h1>
                <StatusBadge status={website.status} />
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <ExternalLink className="h-4 w-4 mr-2" />
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {website.url}
                </a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Last checked</div>
              <div className="text-lg font-semibold">
                {formatDistanceToNow(new Date(website.lastCheck))} ago
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Response Time Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time (Last 30 minutes)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponseChart data={responseData} />
              </CardContent>
            </Card>

            {/* Status History */}
            <Card>
              <CardHeader>
                <CardTitle>Status History (Last 30 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statusHistory.slice(0, 10).map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {day.status === 'up' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {day.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                          {day.status === 'down' && <AlertCircle className="h-5 w-5 text-red-600" />}
                        </div>
                        <div>
                          <div className="font-medium">{format(new Date(day.date), 'MMM dd, yyyy')}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {day.incidents} incidents
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {day.uptime.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">uptime</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <StatusBadge status={website.status} size="sm" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                  <span className="font-semibold text-green-600">{website.uptime.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="font-semibold">
                    {website.responseTime > 0 ? `${website.responseTime}ms` : 'Down'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
                  <span className="text-sm">{format(new Date(website.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">99.9%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">30-day uptime</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">245ms</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg response time</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-semibold">2</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Incidents this month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}