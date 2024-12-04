import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(contentDir);

    // Get file stats (creation/modification times)
    const activities = files.map((file) => {
      const filePath = path.join(contentDir, file);
      const stats = fs.statSync(filePath);

      return {
        fileName: file,
        action: 'Blog Post Created', // Or 'Deleted' depending on action
        timestamp: stats.mtime, // Last modified time
      };
    });

    // Sort by timestamp (most recent first)
    const sortedActivities = activities.sort((a, b) => b.timestamp - a.timestamp);

    // Return the most recent 5 activities
    return new Response(JSON.stringify(sortedActivities.slice(0, 10)), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching activities' }),
      { status: 500 }
    );
  }
}
