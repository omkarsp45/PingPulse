import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'up' | 'down' | 'checking';
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const icons = {
    up: CheckCircle,
    checking: AlertTriangle,
    down: XCircle,
  };

  const colors = {
    up: 'text-green-600 bg-green-50 border-green-200',
    checking: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    down: 'text-red-600 bg-red-50 border-red-200',
  };

  const darkColors = {
    up: 'dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
    checking: 'dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800',
    down: 'dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const Icon = icons[status];
  const statusText = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border rounded-full',
        colors[status],
        darkColors[status],
        sizes[size]
      )}
    >
      <Icon className={iconSizes[size]} />
      {statusText}
    </span>
  );
}