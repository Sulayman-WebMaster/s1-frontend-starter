"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

// Types
interface Language {
  code: string;
  name: string;
  flagUrl: string;
}

const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic (e.g., clear tokens)
    router.push('/login');
  };

  // Language switcher logic
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<Language>({ code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/16x12/us.png' });

  const languages: Language[] = [
    { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/16x12/us.png' },
    { code: 'ko', name: 'Korean', flagUrl: 'https://flagcdn.com/16x12/kr.png' },
  ];

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const selectLanguage = (lang: Language): void => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  // Search bar logic
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Add logic here later to handle search
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between flex-wrap gap-4">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-50 text-gray-800 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Actions: Notifications, User Profile, Language Switcher */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-blue-500 focus:outline-none">
          <FaBell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="h-8 w-8 text-gray-600" />
            <span className="hidden md:inline text-gray-800 font-medium">Admin User</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <img src={selectedLang.flagUrl} alt={`${selectedLang.name} flag`} className="w-6 h-4" />
            <span className="text-sm font-medium">{selectedLang.name}</span>
            <FiChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute mt-2 w-40 rounded-lg shadow-lg bg-white border border-gray-200 z-10">
              <ul className="py-1">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => selectLanguage(lang)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer transition duration-150"
                  >
                    <img src={lang.flagUrl} alt={`${lang.name} flag`} className="w-5 h-3" />
                    <span>{lang.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;