import Link from 'next/link'
import path from 'path';
import fs from "fs";
import matter from 'gray-matter';


const dirPath = path.join(process.cwd(), 'content/');


const FetchBlogPost = () => {

  const dirContent = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));


  const blogPosts = dirContent.map((file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
    
      // Parse frontmatter and content using gray-matter
      const { data, content } = matter(fileContent);
    
      // Log data to check the result
      // console.log(data); // Logs the frontmatter
      // console.log(content); // Logs the content of the blog post
    
      return {
        ...data, // Spread the frontmatter (title, date, etc.)
        content, // Include the post content as well
      };
    });


      return blogPosts;
  
}

export default FetchBlogPost
