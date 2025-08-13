"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaCog, FaUsers, FaSignOutAlt, FaLock, FaFileAlt, FaHistory, FaDatabase } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const DashboardSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = (): void => {
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-gray-100 p-6 h-screen border-r border-gray-200 fixed top-0 left-0 overflow-y-auto lg:w-72 flex flex-col">
      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <Link
              href="/admin/dashboard"
              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors ${
                pathname === '/admin/dashboard' ? 'bg-gray-200 text-blue-600' : ''
              }`}
            >
              <FaHome className="h-5 w-5 text-gray-600" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/users"
              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors ${
                pathname === '/admin/dashboard/users' ? 'bg-gray-200 text-blue-600' : ''
              }`}
            >
              <FaUsers className="h-5 w-5 text-gray-600" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/roles"
              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors ${
                pathname === '/admin/dashboard/roles' ? 'bg-gray-200 text-blue-600' : ''
              }`}
            >
              <FaLock className="h-5 w-5 text-gray-600" />
              <span>Roles & Permissions</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/logs"
              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors ${
                pathname === '/admin/dashboard/logs' ? 'bg-gray-200 text-blue-600' : ''
              }`}
            >
              <FaHistory className="h-5 w-5 text-gray-600" />
              <span>Audit Logs</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/reports"
              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors ${
                pathname === '/admin/dashboard/reports' ? 'bg-gray-200 text-blue-600' : ''
              }`}
            >
              <FaFileAlt className="h-5 w-5 text-gray-600" />
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/backups"
              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors ${
                pathname === '/admin/dashboard/backups' ? 'bg-gray-200 text-blue-600' : ''
              }`}
            >
              <FaDatabase className="h-5 w-5 text-gray-600" />
              <span>Backups</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/settings"
              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors ${
                pathname === '/admin/dashboard/settings' ? 'bg-gray-200 text-blue-600' : ''
              }`}
            >
              <FaCog className="h-5 w-5 text-gray-600" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 text-red-600 font-medium rounded-md hover:bg-gray-200 transition-colors w-full"
        >
          <FaSignOutAlt className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;