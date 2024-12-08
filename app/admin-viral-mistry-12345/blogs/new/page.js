'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Home, FileText, Briefcase, MessageSquare, ChevronDown, ChevronUp, Edit, Trash, Upload,Hammer } from 'lucide-react'
import { marked } from 'marked'
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

const DragDropUpload = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            // console.log(file.name.split('.')[1] )
            const fileType = file.name.split('.')[1]
            if (fileType === 'md') {
                onFileUpload(file);
                alert("File uploded succesfully!...")
            } else {
                alert('Please upload a markdown file.');
            }
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Drag and drop your markdown file here, or click to select a file</p>
            <input
                type="file"
                accept=".md"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        onFileUpload(file);
                    }
                }}
            />
        </div>
    );
};

const Page = () => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [isDragging, setIsDragging] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


    const handleFileUpload = (file) => {
        setUploadedFile(file);
        // console.log(file)
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const html = marked(text);
            setPreview(html);
        };
        reader.readAsText(file);
    };

    const handleSave = async () => {
        if (!uploadedFile) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const fileName = uploadedFile.name.split('.')[0];

            const content = reader.result;
            let res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName, content })

            })

            if (res.ok) {
                alert('Blog saved successfully!');
                setUploadedFile(null);
                setPreview('');
            }
            else {
                alert('error comes');
            }

        }
        reader.readAsText(uploadedFile);






    };



    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        <h3 className="text-gray-700 text-3xl font-medium">Manage Blogs</h3>

                        <div className="mt-8">
                            <DragDropUpload onFileUpload={handleFileUpload} />
                            {preview && (
                                <div className="mt-8">
                                    <h3 className="text-2xl font-bold mb-4">Preview:</h3>
                                    <div className="bg-white p-6 rounded-lg shadow-md" dangerouslySetInnerHTML={{ __html: preview }} />
                                    <button
                                        onClick={handleSave}
                                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                    >
                                        Save Blog
                                    </button>
                                </div>
                            )}


                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Page;

