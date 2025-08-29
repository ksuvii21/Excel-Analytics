// src/components/StatCard.jsx
import React from 'react';

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-500 dark:text-blue-400">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold mt-3">{value}</p>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-green-500 flex items-center">
          <span>↑ 12.5%</span>
          <span className="ml-1">from last month</span>
        </div>
      </div>
    </div>
  );
}
