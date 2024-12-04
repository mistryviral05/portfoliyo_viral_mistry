'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Home, FileText, Briefcase, MessageSquare, LogOut, Mail, Trash, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Logout from '@/components/Logout'
import LoadingBar from 'react-top-loading-bar'
import { usePathname } from 'next/navigation'


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


const MessagesHeader = ({ toggleSidebar }) => {
  const pathName = usePathname()

  const [progress, setProgress] = useState(0);

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
          <span className="text-gray-700 text-lg font-semibold lg:hidden">User Messages</span>
        </div>
        <Logout />
      </div>
    </header>
  )
}

const MessageItem = ({ name, email, message, date,_id }) => {
  const handelDelete = async (_id)=>{
    const res = await fetch('/api/message',{method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({_id})
    })
    if(res.ok){
     alert('Message succesfully deleted 👌');
    }
      else{
        alert('Error deleting message')
      }

}
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="text-gray-700 mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button className="flex items-center text-blue-500 hover:text-blue-700">
          <Mail size={18} />
          <span className="ml-1">Reply</span>
        </button>
        <button className="flex items-center text-red-500 hover:text-red-700">
          <Trash size={18} />
          <span className="ml-1" onClick={()=>handelDelete(_id)}>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default function ManageMessages() {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState([])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const convertToDateTime = (isoString) => {
    const date = new Date(isoString)

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Use 12-hour format (AM/PM)
    }

    // Return the formatted date-time string
    return date.toLocaleString('en-US', options)
  }

  useEffect(() => {
    const getMessage = async () => {
      const res = await fetch('/api/message', { method: 'GET' })
      
      const data = await res.json()
      const sortedMessages = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setMessages(sortedMessages)

    }

    // Call the function to get messages when the component is mounted
    getMessage()
  }, [])


 







  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MessagesHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Messages</h1>

            <div className="mb-8">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full px-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              />
            </div>

            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message._id}>


                  <MessageItem
                    name={message.name}
                    email={message.email}
                    message={message.message}
                    date={convertToDateTime(message.createdAt)}
                    _id = {message._id}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No messages available</p>
            )}

            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </a>
              </nav>

            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

