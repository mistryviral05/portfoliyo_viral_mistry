import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET); // Use TextEncoder for the secret key

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Only check authentication for admin routes
    if (pathname.startsWith('/admin-viral-mistry-12345/dashboard')) {
        const token = req.cookies.get('authToken')?.value;
        console.log(token);

        if (!token) {
            return NextResponse.redirect(new URL('/admin-viral-mistry-12345', req.url));
        }

        try {
            // Verify JWT token using 'jose'
            await jwtVerify(token, SECRET_KEY); // 'await' because 'jwtVerify' is async
        } catch (error) {
            console.error('Invalid token:', error.message);
            return NextResponse.redirect(new URL('/admin-viral-mistry-12345', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin-viral-mistry-12345/:path*'], // Apply middleware to all admin routes
};
