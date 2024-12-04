'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LoadingBar from 'react-top-loading-bar'
import { usePathname } from 'next/navigation'
import { Code } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [progress,setProgress] = useState(0);
  const pathName = usePathname();


  useEffect(() => {

    setProgress(70);
    setTimeout(() => {
      setProgress(100)
    }, 100);
   
  }, [pathName])
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = ['Home', 'About', 'Projects', 'Blog', 'Contact']

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <LoadingBar
        color='#f59e0b'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 text-2xl font-bold text-amber-600 hover:text-amber-600 transition-colors duration-300">
          <Code className="" size={34} />
           Viral Mistry
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {menuItems.map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' :item === 'Blog' ? '/blog':item==='Projects'?'/project': `/#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button 
            className="md:hidden text-gray-800 focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex items-center justify-center relative">
              <span className={`transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''} absolute w-full h-0.5 bg-gray-800 rounded-lg`}></span>
              <span className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''} absolute w-full h-0.5 bg-gray-800 rounded-lg`}></span>
              <span className={`transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''} absolute w-full h-0.5 bg-gray-800 rounded-lg`}></span>
            </div>
          </button>
        </div>
      </header>
      <div 
        className={`fixed inset-0 bg-white z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col h-full justify-center items-center">
          <ul className="space-y-6 text-center">
            {menuItems.map((item) => (
              <li key={item} className="transform transition-all duration-300 ease-in-out">
                <Link 
                  href={item === 'Home' ? '/' : item === 'Blog' ? '/blog':item==='Projects'?'/project': `/#${item.toLowerCase()}`}
                  className="text-2xl text-gray-800 hover:text-amber-600 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

