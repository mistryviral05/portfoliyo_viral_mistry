"use client"
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-yellow-500 text-white p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/messages">📬 Messages</Link>
          </li>
          <li>
            <Link href="/admin/blogs">✍️ Blogs</Link>
          </li>
          <li>
            <Link href="/admin/projects">📁 Projects</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
