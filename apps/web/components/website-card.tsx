'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/status-badge';
import { Website } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';

interface WebsiteCardProps {
  website: Website;
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  const getResponseTimeColor = (time: number) => {
    if (time === 0) return 'text-red-600';
    if (time < 300) return 'text-green-600';
    if (time < 600) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Link href={`/dashboard/website/${website.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold mb-1">
                {website.name}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <ExternalLink className="h-3 w-3 mr-1" />
                {website.url}
              </div>
            </div>
            <StatusBadge status={website.status} size="sm" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Uptime
              </div>
              <div className="text-xl font-bold text-green-600">
                {website.uptime.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Clock className="h-3 w-3 mr-1" />
                Response Time
              </div>
              <div className={`text-xl font-bold ${getResponseTimeColor(website.responseTime)}`}>
                {website.responseTime > 0 ? `${website.responseTime}ms` : 'Down'}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
            Last checked {formatDistanceToNow(new Date(website.lastCheck))} ago
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}