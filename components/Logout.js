// components/Logout.js
'use client'

import { useRouter } from 'next/navigation';
import { Menu, X, Home, FileText, Briefcase, MessageSquare, LogOut } from 'lucide-react'

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the authToken cookie
    document.cookie = 'authToken=; path=/; max-age=0;';
    // Redirect the user to the login page
    router.push('/admin-viral-mistry-12345');
  };

  return (
    <button onClick={handleLogout} className="flex items-center text-gray-700 hover:text-gray-900">
          <LogOut size={20} />
          <span className="ml-2">Logout</span>
        </button>
  );
}
