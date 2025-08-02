"use client"

import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { 
  Plus, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Settings,
  BarChart3,
  Zap
} from 'lucide-react';
import { ThemeToggle } from '../components/theme-toggle';

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

export default function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: '1',
      name: 'My Portfolio',
      url: 'https://myportfolio.com',
      status: 'up',
      uptime: 99.9,
      responseTime: 245,
      lastChecked: '2 minutes ago'
    },
    {
      id: '2',
      name: 'E-commerce Store',
      url: 'https://mystore.com',
      status: 'up',
      uptime: 99.5,
      responseTime: 312,
      lastChecked: '1 minute ago'
    },
    {
      id: '3',
      name: 'API Service',
      url: 'https://api.myservice.com',
      status: 'down',
      uptime: 98.2,
      responseTime: 0,
      lastChecked: '30 seconds ago'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newWebsite, setNewWebsite] = useState({ name: '', url: '' });

  const handleAddWebsite = () => {
    if (newWebsite.name && newWebsite.url) {
      const website: Website = {
        id: Date.now().toString(),
        name: newWebsite.name,
        url: newWebsite.url,
        status: 'checking',
        uptime: 0,
        responseTime: 0,
        lastChecked: 'Just added'
      };
      setWebsites([...websites, website]);
      setNewWebsite({ name: '', url: '' });
      setShowAddModal(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'checking':
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
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

  const upWebsites = websites.filter(w => w.status === 'up').length;
  const downWebsites = websites.filter(w => w.status === 'down').length;
  const avgUptime = websites.reduce((acc, w) => acc + w.uptime, 0) / websites.length || 0;
  const avgResponseTime = websites.filter(w => w.status === 'up').reduce((acc, w) => acc + w.responseTime, 0) / upWebsites || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PingPulse</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your websites and services</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Websites</p>
                <p className="text-2xl font-bold">{websites.length}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online</p>
                <p className="text-2xl font-bold text-green-500">{upWebsites}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold text-red-500">{downWebsites}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Uptime</p>
                <p className="text-2xl font-bold">{avgUptime.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Websites Section */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Websites</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Website</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {websites.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No websites added yet</h3>
                <p className="text-muted-foreground mb-4">Start monitoring your first website</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Your First Website
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {websites.map((website) => (
                  <div
                    key={website.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/dashboard/website/${website.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(website.status)}
                      <div>
                        <h3 className="font-medium">{website.name}</h3>
                        <p className="text-sm text-muted-foreground">{website.url}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium">{website.uptime}%</p>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {website.status === 'up' ? `${website.responseTime}ms` : '-'}
                        </p>
                        <p className="text-xs text-muted-foreground">Response</p>
                      </div>

                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(website.status)}`}>
                          {website.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last checked</p>
                        <p className="text-sm">{website.lastChecked}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Website</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Website Name</label>
                <input
                  type="text"
                  value={newWebsite.name}
                  onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                  placeholder="My Website"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Website URL</label>
                <input
                  type="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWebsite}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}