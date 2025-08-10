'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Website } from '@/types';
import { WebsiteCard } from '@/components/website-card';
import { AddSiteModal } from '@/components/add-site-modal';
import { DashboardSkeleton } from '@/components/loading-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BackendWebsite {
  id: string;
  name: string;
  url: string;
  timeAdded: string;
  userId: string;
  ticks: Array<{
    id: string;
    response_time_ms: number;
    status: 'Up' | 'Down' | 'Checking';
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      fetchWebsites();
    }
  }, [user, authLoading, router]);

  const fetchWebsites = async () => {
    try {
      const response = await fetch('/api/websites');
      if (response.ok) {
        const backendWebsites: BackendWebsite[] = await response.json();

        // Transform backend data to frontend format
        const transformedWebsites: Website[] = backendWebsites.map(website => {
          const latestTick = website.ticks[0];
          const status = latestTick?.status === 'Up' ? 'up' :
            latestTick?.status === 'Down' ? 'down' : 'checking';

          return {
            id: website.id,
            name: website.name,
            url: website.url,
            status,
            uptime: status === 'up' ? 100 : status === 'down' ? 0 : 50, // Simplified for now
            responseTime: latestTick?.response_time_ms || 0,
            lastCheck: latestTick?.createdAt || website.timeAdded,
            createdAt: website.timeAdded,
          };
        });

        setWebsites(transformedWebsites);
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error fetching websites',
          description: errorData.error || 'Failed to load websites',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to fetch websites:', error);
      toast({
        title: 'Error',
        description: 'Failed to load websites. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalWebsites = websites.length;
  const upWebsites = websites.filter(w => w.status === 'up').length;
  const downWebsites = websites.filter(w => w.status === 'down').length;
  const averageUptime = websites.length > 0
    ? websites.reduce((acc, w) => acc + w.uptime, 0) / websites.length
    : 0;
  const averageResponseTime = websites.length > 0
    ? websites.filter(w => w.responseTime > 0).reduce((acc, w) => acc + w.responseTime, 0) / websites.filter(w => w.responseTime > 0).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your websites and track their performance
            </p>
          </div>
          <AddSiteModal onWebsiteAdded={fetchWebsites} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWebsites}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{upWebsites}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{downWebsites}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageResponseTime > 0 ? `${Math.round(averageResponseTime)}ms` : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Website Cards */}
        {websites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No websites yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add your first website to start monitoring its uptime and performance.
              </p>
              <AddSiteModal onWebsiteAdded={fetchWebsites} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}