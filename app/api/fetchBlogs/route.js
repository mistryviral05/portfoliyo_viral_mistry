import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
    try {
        const dirPath = path.join(process.cwd(), 'content/');
        const dirContent = fs.readdirSync(dirPath).filter((file) => file.endsWith('.md'));

        const blogPosts = dirContent.map((file) => {
            const filePath = path.join(dirPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            // Parse frontmatter and content using gray-matter
            const { data, content } = matter(fileContent);

            return {
                ...data, // Spread the frontmatter (title, date, etc.)
                content, // Include the post content
            };
        });

        return new Response(JSON.stringify(blogPosts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
