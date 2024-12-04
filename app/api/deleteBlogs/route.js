import fs from 'fs';
import path from 'path';

export  async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return new Response(
        JSON.stringify({ message: 'File name is required' }),
        { status: 400 }
      );
    }

    console.log(fileName)

   

    const filePath = path.join(process.cwd(), 'content', `${fileName}.md`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return new Response(
        JSON.stringify({ message: 'File successfully deleted!' }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'File not found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return new Response(
      JSON.stringify({ message: 'Error deleting file' }),
      { status: 500 }
    );
  }
}
