// components/NavbarWrapper.js (Client Component)
"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';

const NavbarWrapper = () => {
    const pathname = usePathname();

    // Hide Navbar for admin routes
    const isAdminRoute = pathname.startsWith('/admin-viral-mistry-12345');
  

    return !isAdminRoute ? <Header /> : null;
};

export default NavbarWrapper;
