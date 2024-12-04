'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }) {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = false; // Replace with your auth logic
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
}
