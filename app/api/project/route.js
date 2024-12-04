import connectDB from "@/lib/connectDB";
import Project from "@/lib/model/Project";

export async function POST(req) {
    try {
        // Establish DB connection
        await connectDB();

        // Get form data
        const data = await req.json();

         const{title,description,imageurl}= data;


        
        // Extract individual fields from FormData
      

        // Validate form fields
        if (!title || !description || !imageurl) {
            return new Response(
                JSON.stringify({ message: "Please fill all elements" }),
                { status: 400 } // Changed to 400 for client-side validation error
            );
        }

        // Create new project
        let newProject = new Project({
            title: title,
            description: description,
            imageurl: imageurl,
        });

        // Save the project to the database (async)
        await newProject.save();

        // Return success response
        return new Response(
            JSON.stringify({ message: "Project uploaded successfully" }),
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
export async function GET() {
    try {
        // Establish DB connection
        await connectDB();

        const projects = await Project.find().exec();


        // Return success response
        return new Response(
            JSON.stringify(projects),
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

export async function DELETE(req) {
    try {
       await connectDB();
   const {_id} =await req.json();
   console.log(_id)
        const id = await Project.findOneAndDelete(_id)
        return new Response(
            JSON.stringify({message:'project succesfuly deleted'}),
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




