'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Link from 'next/link'




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

const SkillBar = ({ skill, level }) => {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = `${level}%`
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
  }, [level])


  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-800">{skill}</span>
        <span className="text-sm font-medium text-gray-800">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          ref={ref}
          className="bg-amber-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
  )
}

export default function Home() {

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false);



  const handlechange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })
    
    // console.log(form)



  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Prevent default form submission
    // Check the form data in the console

    try {
      // Send the form data as JSON
      // let formData = new FormData();
      let res = await fetch('/api/registerForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(form), // Send the form data as a JSON string
      });

      // Check if the response was successful
      if (!res.ok) {
        const errorData = await res.json();

        throw new Error(`HTTP error! status: ${res.status}`);
      }
      else{

     



      const responseData = await res.json(); // Handle response from the server
      alert('Thanks for message I will contact you !.....');
      setForm({ name: '', email: '', message: '' })
      setLoading(false)
      }
    } catch (error) {
      alert('Error submitting form:', error.message, error);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-white">
        <AnimatedSection id="home" className="h-screen flex items-center justify-center bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
          <div className="text-center z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fadeIn animation-delay-200">
              I'm a passionate developer creating amazing web experiences
            </p>
           <a href='/project'> <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 animate-fadeIn animation-delay-400">
              Explore My Work
            </button></a>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-full h-full  bg-cover bg-center animate-pulse"></div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">About Me</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image src="/viral_wallpaper.jpg" alt="Developer" width={400} height={400} className="rounded-full mx-auto" />
              </div>
              <div className="md:w-1/2">
                <p className="text-lg mb-4 text-gray-600">
                  I'm a skilled web developer with expertise in JavaScript, React, and Next.js.
                  I love creating responsive and user-friendly web applications that solve real-world problems.
                </p>
                <p className="text-lg mb-6 text-gray-600">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or enjoying outdoor activities.
                </p>
                <div className="space-y-4">

                  <SkillBar skill="HTML" level={90} />
                  <SkillBar skill="CSS" level={90} />
                  <SkillBar skill="JavaScript" level={85} />
                  <SkillBar skill="React" level={70} />
                  <SkillBar skill="Next.js" level={70} />
                  <SkillBar skill="Node.js" level={80} />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* <AnimatedSection id="projects" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "E-commerce Platform", description: "A full-stack solution with Next.js and Stripe integration." },
                { title: "Task Management App", description: "React-based app with drag-and-drop functionality and real-time updates." },
                { title: "AI-powered Chatbot", description: "Intelligent chatbot using natural language processing and machine learning." }
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{project.title}</h3>
                  <p className="mb-4 text-gray-600">{project.description}</p>
                  <a href="#" className="text-amber-600 hover:text-amber-700 transition-colors inline-flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection> */}

     

        <AnimatedSection id="contact" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto" method='POST'>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handlechange}
                  className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handlechange}
                  className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handlechange}
                  className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-500 flex justify-center items-center hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full"
              >
                {loading ? (
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </AnimatedSection>

      </main>
      <footer className='h-10'>

        <Footer />
      </footer>
    </>
  )
}

