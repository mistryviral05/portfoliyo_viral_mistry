import { cookies } from 'next/headers'
import Connect from '@/lib/model/Connect'
import connectDB from '@/lib/connectDB'
 
export async function POST(req) {
  
 try{

  connectDB();
  const { name, email, message } = await req.json(); // Parsing the body

  // Simple validation
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'All fields are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

 

  let newConnecter = new Connect({
    name:name,
    email:email,
    message:message,

});

await newConnecter.save();

  // Return a success response with valid JSON
  return new Response(
    JSON.stringify({ message: 'Form submitted successfully!' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
} catch (error) {
  console.error('Error processing form submission:', error);

  // Return a generic error message
  return new Response(
    JSON.stringify({ error: 'Internal Server Error' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}

 
 
}