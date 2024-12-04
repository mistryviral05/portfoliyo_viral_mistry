'use client'
import {React,useEffect,useState} from 'react'
import { useRef } from 'react'

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

const page = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {

        const fetchProjects = async ()=>{
            const res = await fetch('/api/project',{method:'GET'})
            const data = await res.json()
            setProjects(data)
        }
        fetchProjects()
   
    }, [])
    


  return (
    <>

<AnimatedSection id="projects" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{project.title}</h3>
                  <p className="mb-4 text-gray-600">{project.description}</p>
                  <a target='_blanck' href={project.imageurl} className="text-amber-600 cursor-pointer hover:text-amber-700 transition-colors inline-flex items-center">
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
        </AnimatedSection>





      
    </>
  )
}

export default page
