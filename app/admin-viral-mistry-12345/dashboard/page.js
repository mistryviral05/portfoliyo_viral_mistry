'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Home, FileText, Briefcase, MessageSquare, LogOut, ChevronDown, ChevronUp } from 'lucide-react'
import Logout from '@/components/Logout'
import { usePathname } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'



const Sidebar = ({ isOpen, toggleSidebar }) => {
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
      </nav>
    </div>
  )
}

const NavItem = ({ icon, text, href, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => setIsOpen(!isOpen);

  if (children) {
    // Render dropdown menu
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

  // Render simple link for non-dropdown items
  return (
    <Link href={href}>
      <div className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200">
        {icon}
        <span className="ml-3">{text}</span>
      </div>
    </Link>
  );
};


const DashboardHeader = ({ toggleSidebar }) => {

  const pathName = usePathname()

  const [progress,setProgress] = useState(0);

  useEffect(() => {

    setProgress(70);
    setTimeout(() => {
      setProgress(100)
    }, 100);
   
  }, [pathName])
  return (
    <header className="bg-white shadow-md">

<LoadingBar
        color='#f59e0b'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 lg:hidden">
          <Menu size={24} />
        </button>
        <div className="flex items-center">
          <span className="text-gray-700 text-lg font-semibold lg:hidden">Admin Dashboard</span>
        </div>
        <Logout />
      </div>
    </header>
  )
}

const DashboardCard = ({ title, count, linkText, href }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-700 mb-4">{count}</p>
      <Link href={href} className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
        {linkText}
      </Link>
    </div>
  )
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [recentActivities, setRecentActivities] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState([])
  const [project, setProject] = useState([])
 
  useEffect(() => {
    
    const fetchRecentActivities = async () => {
      try {
        const res = await fetch('/api/recentAcivity'); // Call the API route
        if (res.ok) {
          const activities = await res.json();
          setRecentActivities(activities);
          console.log(activities) // Update state with fetched activities
        } else {
          console.error('Error fetching recent activities:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      }
    };
    const fetchAllItems = async () => {
      const res = await fetch('/api/fetchBlogs', { method: 'GET' })
      const message = await fetch('/api/message', { method: 'GET' })
      const project = await fetch('/api/project',{method:'GET'})
      const blogs = await res.json();
      const messages = await message.json();
      const projects = await project.json();
      setBlogs(blogs)
      setMessage(messages);
      setProject(projects)
    }
   
    fetchRecentActivities();
    fetchAllItems();
  }, [])
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>

            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              <DashboardCard title="Total Blogs" count={blogs.length} linkText="Manage Blogs" href="/admin-viral-mistry-12345/blogs/edit" />
              <DashboardCard title="Total Projects" count={project.length} linkText="Manage Projects" href="/admin-viral-mistry-12345/projects/new" />
              <DashboardCard title="New Messages" count={message.length} linkText="View Messages" href="/admin-viral-mistry-12345/message" />
              <DashboardCard title="Recent Activity" count={recentActivities.length} linkText="View All" href="#" />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <ul className="divide-y divide-gray-200">
                {recentActivities
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp (most recent first)
                  .map((item, index) => (
                    <li key={index} className="py-3">
                      <p className="text-gray-700">{`${item.action}: ${item.fileName}`}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleString()} {/* Convert timestamp to readable format */}
                      </p>
                    </li>
                  ))}

              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

