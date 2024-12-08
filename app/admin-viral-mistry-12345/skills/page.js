'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Home, FileText, Briefcase, MessageSquare, Trash, Edit, ChevronDown, ChevronUp, Hammer } from 'lucide-react'
import Logout from '@/components/Logout'
import { usePathname } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'
import { useForm } from "react-hook-form"
import { CircleLoader } from 'react-spinners'

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

const SkillHeader = ({ toggleSidebar }) => {
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
        <Logout />
      </div>
    </header>
  )
}

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true);
  const [editSkill, setEditSkill] = useState(null)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/skill', { method: 'GET' })
        const data = await res.json();
        console.log(data)
        if(res.ok){
          setSkills(data);
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkill();
  }, [])

  const handleDelete = async (_id) => {
    const res = await fetch('/api/skill', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id })
    })
    if (res.ok) {
      const result = await res.json();
      alert(result.message);
      console.log(skills)
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  const onHandelerSubmit = async (data) => {
    setSkills([...skills,{...data}])
    const method = editSkill ? 'PUT' : 'POST';
    const url = editSkill ? `/api/updateSkill/${editSkill._id}` : `/api/skill`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        alert(result.message);

        if (editSkill) {
          setSkills(skills.map(skill => 
            skill._id === editSkill._id ? { ...skill, ...data } : skill
          ));
          setEditSkill(null); // Reset the edit state after successful update
          reset(); // Reset the form
        } else {
          setSkills(prevSkills => [...prevSkills, result.skill]);
        }
      } else {
        const result = await res.json();
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (data) => {
    setEditSkill(data);
    setValue('name', data.name)
    setValue('level', data.level)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SkillHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <form onSubmit={handleSubmit(onHandelerSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 mt-10">
            <div className="mb-4">
              <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-1">Skill Name:</label>
              <input
                type="text"
                id="skillName"
                name="skillName"
                {...register("name", { required: true })}
                className="w-full px-3 py-2 border-2 border-black rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && <span className="text-red-800">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">Skill Level:</label>
              <input
                type="number"
                id="skillLevel"
                name="skillLevel"
                {...register("level", { required: true })}
                className="w-full px-3 py-2 border-2 border-black rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.level && <span className="text-red-800">This field is required</span>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-transform duration-300 hover:scale-105"
            >
              {editSkill ? 'Update skill' : 'Submit Skill'}
            </button>
          </form>

          <div className="py-7 px-5">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Uploaded Skills</h1>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {loading ? (
                  <div className="flex justify-center items-center h-screen">
                    <CircleLoader color="#4A90E2" size={50} />
                  </div>
                ) : (
                  <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-md text-black font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">Skill Name</th>
                        <th scope="col" className="px-6 py-3 text-center">Skill Level</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((skil, index) => (
                        skil && skil.name && skil.level && (                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <td className="px-6 py-4 text-start">{skil.name}</td>
                          <td className="px-6 py-4 text-center">{skil.level}</td>
                          <td className="px-6 py-4 flex gap-4">
                            <Trash onClick={() => { handleDelete(skil._id) }} size={20} className="cursor-pointer text-red-600" />
                            <Edit onClick={() => handleEdit(skil)} size={20} className="cursor-pointer text-blue-600" />
                          </td>
                        </tr>)
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
