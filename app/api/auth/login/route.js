import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET
// import bcrypt from 'bcrypt';

export async function POST(request) {
    const { username, password } = await request.json();

    // Environment credentials
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Validate username
    if (username !== adminUsername) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Validate password
    
    if (password !== adminPassword) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
    
    return NextResponse.json({ token }, { status: 200 });

    // Login success - set session/cookie (simplified example)
    // return NextResponse.json({ message: 'Login successful' }, { status: 200 });
}
