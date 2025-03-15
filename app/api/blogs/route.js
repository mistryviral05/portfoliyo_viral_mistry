import FetchBlogPost from '@/components/FetchBlogPost';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.json();
    const { fileName, content } = data;
    if(!fileName && !content){
      return new Response(JSON.stringify({ message: 'file take does not name and content ' }), { status: 200 });

    }

    const blogsDir = path.join(process.cwd(), 'content/');

    if (!fs.existsSync(blogsDir)) {
      fs.mkdirSync(blogsDir, { recursive: true });
    }

    // Create a file name
    const filePath = path.join(blogsDir, `${fileName}.md`);

    fs.writeFileSync(filePath, content, 'utf-8');
    return new Response(JSON.stringify({ message: 'File uploaded successfully!' }), { status: 200 });
  } catch (err) {
    console.log("The error is: ", err);
    return new Response(JSON.stringify({ message: 'Error uploading file' }), { status: 500 });
  }
}


export async function GET(req) {
  try {
    const blogPosts = FetchBlogPost();
    return new Response(JSON.stringify({ message: blogPosts }), { status: 200 });
    
  } catch (error) {
    console.log("The error is: ", error);
    return new Response(JSON.stringify({ message: 'Error fetching file' }), { status: 500 });
  }
  
}
