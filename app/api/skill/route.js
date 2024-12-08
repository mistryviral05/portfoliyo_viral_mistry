import { cookies } from 'next/headers'
import Skill from '@/lib/model/Skill';
import connectDB from '@/lib/connectDB'
import { NextResponse } from 'next/server';
 
export async function POST(req) {
  
 try{

  connectDB();
  const { name, level } = await req.json(); // Parsing the body

  // Simple validation
  if (!name || !level) {
    return new Response(
      JSON.stringify({ error: 'All fields are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

 

  let newSkill = new Skill({
    name:name,
    level:level,

});

await newSkill.save();

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

export async function GET() {

  try {

    await connectDB();

    let skill = await Skill.find({});
    console.log(skill)
    return NextResponse.json(skill);

  } catch (error) {
    console.log(error)
    return NextResponse.json(JSON.stringify({message:'error comes'}));


  }

}

export async function DELETE(req) {
  try {
     await connectDB();
 const {_id} =await req.json();
 

      const id = await Skill.findOneAndDelete({_id})
   
      return new Response(
          JSON.stringify({message:'skill succesfuly deleted'}),
          { status: 200 }
      );
  } catch (err) {
      console.error("The error is: ", err);

      // Return error response with a 500 status
      return new Response(
          JSON.stringify({ message: "Server error, please try again" }),
          { status: 500 }
      );
  }
}