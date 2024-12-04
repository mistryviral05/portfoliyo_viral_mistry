
import Connect from '@/lib/model/Connect'
import connectDB from '@/lib/connectDB'
import { NextResponse } from 'next/server';

export async function GET(req) {

  try {

    await connectDB();

    let messages = await Connect.find({});
    return NextResponse.json(messages);

  } catch (error) {
    console.log(error)


  }

}


export async function DELETE(req) {
  try {
     await connectDB();
 const {_id} =await req.json();
 console.log(_id)
      const id = await Connect.findOneAndDelete(_id)
      return new Response(
          JSON.stringify({message:'message succesfuly deleted'}),
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