"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'



// const blogPosts = FetchBlogPost();







// const POSTS_PER_PAGE = 6

export default function Blog() {
  //   const [searchTerm, setSearchTerm] = useState('')
  //   const [currentPage, setCurrentPage] = useState(1)
  //   const [selectedCategory, setSelectedCategory] = useState('All')
  const [blogPosts, setblogPosts] = useState([])

  //   const filteredPosts = blogPosts.filter(post => 
  //     (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     (selectedCategory === 'All' || post.category === selectedCategory)
  //   )

  //   const pageCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  //   const paginatedPosts = filteredPosts.slice(
  //     (currentPage - 1) * POSTS_PER_PAGE,
  //     currentPage * POSTS_PER_PAGE
  //   )

  // const categories = ['All', ...new Set(blogPosts.map(post => post.category))]
  useEffect(() => {
  
    const handleFetchBlogpost = async()=>{
      try {
          const res = await fetch("/api/blogs/",{method:"GET"})
           if(res.ok){
            const {message}= await res.json();
            setblogPosts(message)
           }
      } catch (error) {
         console.log(error)
      }
  
    }
    handleFetchBlogpost()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Blog</h1>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full md:w-64 p-2 rounded-md border border-gray-300 mb-4 md:mb-0"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <select
            className="w-full md:w-48 p-2 rounded-md border border-gray-300"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.length >0 ? blogPosts.map((blog, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
             
              <h1 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h1>
              <p className="text-sm text-gray-500 mb-3">{blog.date}</p>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex justify-between items-center">
                <Link href={`/blog/${blog.slug}`} className="text-amber-600 hover:text-amber-700 transition-colors">
                  Read More
                </Link>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{blog.category}</span>
              </div>
            </div>
          )): <p className='text-2xl text-black font-bold'>Not uploded blogPosts by admin</p>}
        </div>


       
       
        {/* {pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            {[...Array(pageCount)].map((_, i) => (
              <button
                key={i}
                className={`mx-1 px-3 py-1 rounded transition-colors duration-300 ${
                  currentPage === i + 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-amber-200'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )} */}
      </main>
    </div>
  )
}

