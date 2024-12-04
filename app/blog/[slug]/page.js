import Link from 'next/link'
import path from 'path';
import fs from "fs";
import matter from 'gray-matter';
import {unified} from 'unified'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { notFound } from 'next/navigation';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'

// Update the function signature to await params
export default async function BlogPost({ params }) {
  // Await the params before using them
  const { slug } = await params;

  const filepath =  `content/${slug}.md`
  if(!fs.existsSync(filepath)){ 
    notFound() 
    return 
  } 

  const fileContent = fs.readFileSync(filepath, "utf-8")
  const { content, data } = matter(fileContent)

  const file =  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypePrettyCode, {
      theme: "ayu-dark",
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeFormat)
    .use(rehypeStringify)

  const htmlContent = (await file.process(content)).toString();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        <Link href="/blog" className="text-amber-600  hover:text-amber-700 transition-colors mb-4 inline-block">
          &larr; Back to Blog
        </Link>
        <article className="bg-white py-8 px-10 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">{data.title}</h1>
          <p className="text-sm text-gray-500 mb-4 text-center">{data.date}</p>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose max-w-none"></div>
        </article>
      </main>
    </div>
  )
}
