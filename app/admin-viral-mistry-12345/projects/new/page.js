'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Home, FileText, Briefcase, MessageSquare, ChevronDown, ChevronUp, Edit, Trash, Upload,Hammer } from 'lucide-react'
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
          <span className="text-gray-700 text-lg font-semibold lg:hidden">Admin Dashboard</span>
        </div>
        <button className="text-gray-700 hover:text-gray-900">Logout</button>
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
export default function NewProject() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageurl: "",
  });
  const [status, setStatus] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {

      const res = await fetch('/api/project', { method: 'GET' });
      const data = await res.json();
      setProjects(data);

    }
    fetchProjects();
  }, [])




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (res.ok) {

      alert("Project success fully uploded 👌");
      setFormData({ title: "", description: "", imageurl: "" });
    } else {
      const result = await res.json();
      alert(result);
    }


  };
  const handelDelete = async (_id) => {
    try {

      console.log(JSON.stringify(_id))
      const res = await fetch('/api/project', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Proper header
        },
        body: JSON.stringify({ _id }), // Ensure body is JSON
      });

      if (res.ok) {
        alert('Project successfully deleted');
      } else {
        const errorData = await res.json();
        alert(`Something went wrong: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error during deletion:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
     <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow">
              <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
              {status && (
                <div
                  className={`mb-4 p-2 text-center ${status.type === "success" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                    }`}
                >
                  {status.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border-2 border-black rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border-2 border-black rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageurl"
                    id="imageurl"
                    value={formData.imageurl}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border-2 border-black rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-transform duration-300 hover:scale-105"
                >
                  Add Project
                </button>
              </form>
            </div>
            <div className='py-7 px-5'>
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Upload Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 "
                    >
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{project.title}</h3>
                      <p className="mb-4 text-gray-600">{project.description}</p>
                      <div className='flex justify-between'>
                        <a target='_blanck' href={project.imageurl} className="text-amber-600 hover:text-amber-700 transition-colors inline-flex items-center">
                          go via link
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </a>
                        <button onClick={() => handelDelete(project._id)} className="text-red-500 hover:text-red-600">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

