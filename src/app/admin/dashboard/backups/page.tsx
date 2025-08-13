"use client";

import React, { useState } from 'react';

// Types
interface Backup {
  id: number;
  date: string;
  status: 'Completed' | 'Failed';
  size: string;
}

const BackupsPage: React.FC = () => {
  // Mock backup data
  const [backups, setBackups] = useState<Backup[]>([
    { id: 1, date: '2025-08-12', status: 'Completed', size: '1.2 GB' },
    { id: 2, date: '2025-08-11', status: 'Completed', size: '1.1 GB' },
    { id: 3, date: '2025-08-10', status: 'Failed', size: '0 GB' },
  ]);

  const handleBackup = (): void => {
    // Mock backup logic
    const newBackup: Backup = { id: backups.length + 1, date: new Date().toISOString().split('T')[0], status: 'Completed', size: '1.3 GB' };
    setBackups([newBackup, ...backups]);
  };

  const handleRestore = (id: number): void => {
    // Mock restore logic
    console.log(`Restoring backup ${id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Backup and Restore</h1>

      <button
        onClick={handleBackup}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create Backup
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {backups.map((backup) => (
              <tr key={backup.id} className="border-t">
                <td className="px-6 py-4">{backup.date}</td>
                <td className="px-6 py-4">{backup.status}</td>
                <td className="px-6 py-4">{backup.size}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRestore(backup.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BackupsPage;