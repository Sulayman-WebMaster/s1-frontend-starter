"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface ReportData {
  month: string;
  users: number;
  revenue: number;
}

const ReportsPage: React.FC = () => {
  // Mock report data
  const reportData: ReportData[] = [
    { month: 'Jan', users: 100, revenue: 5000 },
    { month: 'Feb', users: 150, revenue: 7500 },
    { month: 'Mar', users: 200, revenue: 10000 },
    { month: 'Apr', users: 180, revenue: 9000 },
    { month: 'May', users: 250, revenue: 12500 },
    { month: 'Jun', users: 300, revenue: 15000 },
    { month: 'Jul', users: 280, revenue: 14000 },
    { month: 'Aug', users: 220, revenue: 11000 },
  ];

  const handleExport = (format: 'csv' | 'pdf'): void => {
    // Mock export logic
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Advanced Reports</h1>

      {/* Report Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">User and Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={reportData}>
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3B82F6" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#EF4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleExport('csv')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Export CSV
        </button>
        <button
          onClick={() => handleExport('pdf')}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;