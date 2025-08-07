import { Website, ResponseTimeData, StatusHistory } from '@/types';

export const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'Company Website',
    url: 'https://example.com',
    status: 'up',
    uptime: 99.9,
    responseTime: 245,
    lastCheck: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'API Server',
    url: 'https://api.example.com',
    status: 'warning',
    uptime: 98.5,
    responseTime: 892,
    lastCheck: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Blog',
    url: 'https://blog.example.com',
    status: 'up',
    uptime: 99.8,
    responseTime: 156,
    lastCheck: new Date(Date.now() - 30 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'E-commerce Store',
    url: 'https://store.example.com',
    status: 'down',
    uptime: 95.2,
    responseTime: 0,
    lastCheck: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const generateResponseTimeData = (websiteId: string): ResponseTimeData[] => {
  const data: ResponseTimeData[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 1000);
    const website = mockWebsites.find(w => w.id === websiteId);
    
    if (website?.status === 'down') {
      data.push({
        timestamp: timestamp.toISOString(),
        responseTime: i < 5 ? 0 : Math.random() * 500 + 200,
        status: i < 5 ? 'down' : 'up',
      });
    } else {
      const baseTime = website?.responseTime || 300;
      const variance = Math.random() * 200 - 100;
      data.push({
        timestamp: timestamp.toISOString(),
        responseTime: Math.max(50, baseTime + variance),
        status: website?.status || 'up',
      });
    }
  }
  
  return data;
};

export const generateStatusHistory = (websiteId: string): StatusHistory[] => {
  const data: StatusHistory[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toISOString().split('T')[0],
      status: Math.random() > 0.1 ? 'up' : Math.random() > 0.7 ? 'warning' : 'down',
      uptime: Math.random() * 5 + 95,
      incidents: Math.floor(Math.random() * 3),
    });
  }
  
  return data;
};