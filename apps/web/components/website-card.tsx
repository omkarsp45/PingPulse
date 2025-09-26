'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { StatusBadge } from '@/components/status-badge';
import { Website } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Clock, TrendingUp, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface WebsiteCardProps {
  website: Website;
  onDelete?: () => void;
}

export function WebsiteCard({ website, onDelete }: WebsiteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    setShowDeleteDialog(false);
    
    try {
      const response = await fetch(`/api/websites/${website.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Website deleted',
          description: `${website.name} has been successfully deleted.`,
        });
        onDelete?.();
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.error || 'Failed to delete website',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete website. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const getResponseTimeColor = (time: number) => {
    if (time === 0) return 'text-red-600';
    if (time < 300) return 'text-green-600';
    if (time < 600) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
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
              <div className="flex items-center space-x-2">
                <StatusBadge status={website.status} size="sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  title="Delete website"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Website</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "<strong>{website.name}</strong>"? 
              This action cannot be undone and will permanently remove all monitoring data for this website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Website
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}