'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, FileText, Briefcase, MessageSquare, LogOut, ChevronDown, ChevronUp, Edit, Trash,Hammer } from 'lucide-react'
import Logout from '@/components/Logout'
import { useRouter } from 'next/navigation';
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
          <NavItem icon={<Hammer size={20} />} text="User Skills" href="/admin-viral-mistry-12345/skills" />
        </nav>
      </div>
    )
  }

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

const AnimatedSection = ({ children, className, id }) => {
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeIn')
                    }
                })
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    return (
        <section
            id={id}
            ref={ref}
            className={`${className} opacity-0 transition-opacity duration-1000 ease-out`}
        >
            {children}
        </section>
    )
}

const Page = () => {
     // Correct placement of useRouter hook inside the component
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        

 
    const fetchBlogs = async ()=>{

        const res = await fetch('/api/fetchBlogs',{method:'GET'})

        const blogs =  await res.json();

        // console.log(blogs);

        setBlogs(blogs)



    }

    fetchBlogs();
  }, [])

  const handleDelete = async(name)=>{
    try{

    
    const fileName = name;

    const response = await fetch(`/api/deleteBlogs?fileName=${fileName}`,{method:'DELETE'})

    
    if(response.ok)
        {
            const result = await response.json();
        alert(result.message)
    }else{
        const result = await response.json();
        console.log(result.message)
    }

    }catch(err)
    {
        console.log(err)
    }
    

   



  }
   

   

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <div className='flex-1 overflow-auto'>
                <AnimatedSection id="blog" className="py-12 ">
                    <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">All Posted blogs</h2>
                    <div className="container mx-auto px-4 h-auto ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto py-2">
                            {blogs.length > 0 ? blogs.map((blog) => (
                                <div key={blog.title} className="bg-white rounded-lg shadow-md p-6">
                                <h4 className="text-xl font-semibold">{blog.title}</h4>
                                <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{blog.date}</span>
                                    <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded-full">
                                        {blog.category}
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    {/* <button onClick={() => router.push(`/admin-viral-mistry-12345/blogs/edit/${blog._id}`)} className="text-blue-500 hover:text-blue-600">
                                        <Edit size={20} />
                                    </button> */}
                                    <button onClick={()=>handleDelete(blog.slug)} className="text-red-500 hover:text-red-600">
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>
                            )) : <p className="text-gray-600">No blogs uploaded</p>}
                        </div>
                    </div>
                </AnimatedSection></div>
            </div>
        </div>
    )
}

export default Page;
