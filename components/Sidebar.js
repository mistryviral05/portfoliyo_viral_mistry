'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, FileText, Briefcase, MessageSquare, ChevronDown, ChevronUp, Hammer } from 'lucide-react'

const NavItem = ({ icon, text, href, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);

  if (children) {
    return (
      <div className="relative">
        <div
          className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 cursor-pointer"
          onClick={toggleDropdown}
        >
          {icon}
          <span className="ml-3 flex-1">{text}</span>
          <span className="ml-auto">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
        {isOpen && (
          <ul className="ml-6 mt-1 bg-gray-900 rounded shadow-lg">
            {children}
          </ul>
        )}
      </div>
    );
  }

  return (
    <Link href={href}>
      <div className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200">
        {icon}
        <span className="ml-3">{text}</span>
      </div>
    </Link>
  );
};

export const Sidebar = ({ isOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <span className="text-xl font-semibold">Admin Dashboard</span>
      </div>
      <nav className="mt-8">
        <NavItem icon={<Home size={20} />} text="Dashboard" href="/admin-viral-mistry-12345/dashboard" />
        <NavItem icon={<FileText size={20} />} text="Manage Blogs" href="#">
          <li>
            <Link
              href="/admin-viral-mistry-12345/blogs/new"
              className="block px-6 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              New Blog
            </Link>
          </li>
          <li>
            <Link
              href="/admin-viral-mistry-12345/blogs/edit"
              className="block px-6 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Edit Blog
            </Link>
          </li>
        </NavItem>
        <NavItem icon={<Briefcase size={20} />} text="Manage Projects" href="/admin-viral-mistry-12345/projects/new" />
        <NavItem icon={<MessageSquare size={20} />} text="User Messages" href="/admin-viral-mistry-12345/message" />
        <NavItem icon={<Hammer size={20} />} text="User Skills" href="/admin-viral-mistry-12345/skills" />
      </nav>
    </div>
  )
}

