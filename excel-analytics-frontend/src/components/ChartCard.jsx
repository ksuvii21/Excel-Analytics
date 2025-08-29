// src/components/ChartCard.jsx
import React from 'react';
import { LineChart } from 'lucide-react';

export default function ChartCard({ title = "Data Visualization" }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">{title}</h3>
        <LineChart className="h-5 w-5 text-blue-500" />
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
          <p className="mt-3 text-gray-500 dark:text-gray-400">Chart visualization</p>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-3">
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">
          Export
        </button>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
          Analyze
        </button>
      </div>
    </div>
  );
}
