'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResponseTimeData } from '@/types';
import { format } from 'date-fns';

interface ResponseChartProps {
  data: ResponseTimeData[];
}

export function ResponseChart({ data }: ResponseChartProps) {
  // Filter out invalid data and ensure dates are valid
  const validData = data.filter(item => {
    if (!item.timestamp) return false;
    const date = new Date(item.timestamp);
    return !isNaN(date.getTime());
  });

  const formatXAxisTick = (tickItem: string) => {
    try {
      const date = new Date(tickItem);
      if (isNaN(date.getTime())) return '';
      return format(date, 'HH:mm');
    } catch (error) {
      return '';
    }
  };

  const formatTooltipLabel = (label: string) => {
    try {
      const date = new Date(label);
      if (isNaN(date.getTime())) return '';
      return format(date, 'HH:mm:ss');
    } catch (error) {
      return '';
    }
  };

  if (validData.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center text-gray-500">
        <p>No response time data available</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={validData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxisTick}
            fontSize={12}
          />
          <YAxis
            fontSize={12}
            tickFormatter={(value) => `${value}ms`}
          />
          <Tooltip
            labelFormatter={formatTooltipLabel}
            formatter={(value: number, name: string) => [`${value}ms`, 'Response Time']}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
            }}
          />
          <Line
            type="monotone"
            dataKey="responseTime"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}