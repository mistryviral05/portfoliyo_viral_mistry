import localFont from "next/font/local";

import "./globals.css";

import NavbarWrapper from "@/components/NavbarWrapper";
import { icons } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'Advanced Developer Portfolio',
  description: 'A showcase of cutting-edge web development skills',
  icons:{
    icon: '/favicon.webp'
      
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` bg-white text-gray-800`}
      >
       <NavbarWrapper/>
       {children}
      </body>
    </html>
  );
}
