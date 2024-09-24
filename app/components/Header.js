// components/Header.js
"use client"; // Ensure this component is a Client Component

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiMenu, FiChevronDown } from 'react-icons/fi'; // Icons for menu and dropdown

export default function Header({ onMenuClick }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center">
      {/* Left side: Hamburger menu and title */}
      <div className="flex items-center">
        {/* Hamburger menu on mobile */}
        <button onClick={onMenuClick} className="md:hidden mr-2">
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold">Gerenciador de Campanhas</h1>
      </div>

      {/* Right side: Navigation */}
      <nav>
        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/dashboard" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="hover:underline">Profile</Link>
          </li>
          <li>
            <button 
              onClick={handleLogout} 
              className="flex items-center space-x-2 hover:underline"
            >
              <span>Logout</span>
              <FiLogOut /> {/* Logout icon */}
            </button>
          </li>
        </ul>

        {/* Mobile navigation */}
        <div className="md:hidden relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center">
            <FiChevronDown size={24} />
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-md w-40">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <span>Logout</span>
                  <FiLogOut /> {/* Logout icon */}
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
