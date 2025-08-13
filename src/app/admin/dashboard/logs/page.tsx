"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface Log {
  id: number;
  timestamp: string;
  user: string;
  action: string;
}

interface ChartData {
  date: string;
  count: number;
}

const LogsPage: React.FC = () => {
  // Mock log data
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, timestamp: '2025-08-12 10:00', user: 'Admin', action: 'Updated user' },
    { id: 2, timestamp: '2025-08-12 11:15', user: 'Editor', action: 'Viewed report' },
    { id: 3, timestamp: '2025-08-11 09:30', user: 'Admin', action: 'Logged in' },
    { id: 4, timestamp: '2025-08-11 14:45', user: 'Viewer', action: 'Viewed dashboard' },
    { id: 5, timestamp: '2025-08-10 16:20', user: 'Admin', action: 'Created role' },
  ]);

  // Mock chart data for log activity
  const logActivityData: ChartData[] = [
    { date: 'Aug 10', count: 1 },
    { date: 'Aug 11', count: 2 },
    { date: 'Aug 12', count: 2 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>

      {/* Log Activity Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Log Activity Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={logActivityData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="px-6 py-4">{log.timestamp}</td>
                <td className="px-6 py-4">{log.user}</td>
                <td className="px-6 py-4">{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;