import React from 'react';
import { Server, Database, Cpu, HardDrive } from 'lucide-react';

export default function SystemMetrics() {
  const metrics = [
    { label: 'CPU Usage', value: '45%', icon: <Cpu className="h-5 w-5" />, color: 'bg-blue-500' },
    { label: 'Memory Usage', value: '62%', icon: <Server className="h-5 w-5" />, color: 'bg-green-500' },
    { label: 'Disk Usage', value: '38%', icon: <HardDrive className="h-5 w-5" />, color: 'bg-yellow-500' },
    { label: 'Database Size', value: '2.4GB', icon: <Database className="h-5 w-5" />, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">System Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center">
            <div className={`p-3 rounded-full ${metric.color} text-white mr-4`}>
              {metric.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 dark:text-white mb-3">Recent System Events</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            System backup completed - 2 hours ago
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Database optimization - 5 hours ago
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            Security patch applied - 1 day ago
          </div>
        </div>
      </div>
    </div>
  );
}