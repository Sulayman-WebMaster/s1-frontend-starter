"use client";
import React, { useState } from 'react';
import { FaUsers, FaUserFriends, FaUserPlus, FaSearch } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Types
interface Stat {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
  joined: string;
}

interface ChartData {
  month: string;
  newUsers: number;
}

const Page: React.FC = () => {
  // State for user search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State for editing user
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Mock user data
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', active: true, joined: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false, joined: '2025-02-20' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', active: true, joined: '2025-03-10' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', active: true, joined: '2025-04-05' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', active: false, joined: '2025-05-12' },
    { id: 6, name: 'David Evans', email: 'david@example.com', active: true, joined: '2025-06-18' },
    { id: 7, name: 'Eve Foster', email: 'eve@example.com', active: true, joined: '2025-07-22' },
    { id: 8, name: 'Frank Green', email: 'frank@example.com', active: false, joined: '2025-08-01' },
  ]);

  // Filtered users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle edit
  const handleEdit = (user: User): void => {
    setEditingUser(user);
    setIsEditing(true);
  };

  // Handle update
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? editingUser : u))
      );
      setIsEditing(false);
      setEditingUser(null);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      });
    }
  };

  // Stats mock data
  const stats: Stat[] = [
    {
      title: 'Active Users',
      value: 1200,
      icon: <FaUsers className="w-8 h-8 text-blue-500" />,
      description: 'Users currently active this month',
    },
    {
      title: 'Total Users',
      value: 5000,
      icon: <FaUserFriends className="w-8 h-8 text-blue-500" />,
      description: 'All registered users',
    },
    {
      title: 'New Users',
      value: 300,
      icon: <FaUserPlus className="w-8 h-8 text-blue-500" />,
      description: 'Users joined this month',
    },
  ];

  // Stats animation
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Mock chart data for user growth
  const userGrowthData: ChartData[] = [
    { month: 'Jan', newUsers: 100 },
    { month: 'Feb', newUsers: 150 },
    { month: 'Mar', newUsers: 200 },
    { month: 'Apr', newUsers: 180 },
    { month: 'May', newUsers: 250 },
    { month: 'Jun', newUsers: 300 },
    { month: 'Jul', newUsers: 280 },
    { month: 'Aug', newUsers: 220 },
  ];

  // Pie chart data
  const activeUsers = users.filter((u) => u.active).length;
  const inactiveUsers = users.length - activeUsers;
  const pieData = [
    { name: 'Active', value: activeUsers },
    { name: 'Inactive', value: inactiveUsers },
  ];
  const COLORS = ['#3B82F6', '#EF4444'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-left mb-6">Welcome to the Admin Dashboard</h1>

      {/* Start of Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" ref={statsRef}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              {stat.icon}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {statsInView ? (
                    <CountUp start={0} end={stat.value} duration={2.5} separator="," />
                  ) : (
                    '0'
                  )}
                </p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End of Stats Section */}

      {/* Start of User Management Section */}
      <div className="mb-8">
        <div className="relative flex items-center mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-50 text-gray-800 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.active ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEditing && editingUser && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Update User</h3>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="active"
                    checked={editingUser.active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700">Active</label>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* End of User Management Section */}

      {/* Start of Analytics Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Growth Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">User Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="newUsers" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active/Inactive Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">User Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* End of Analytics Charts Section */}
    </div>
  );
};

export default Page;