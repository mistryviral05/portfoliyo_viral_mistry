import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Skill from "@/lib/model/Skill";

export async function PUT(req,{params}) {
  await connectDB();
    const {id}= await params;
    const {name,level}= await req.json();
    const skill = await Skill.findByIdAndUpdate(id, {name,level}, {new: true});
    
    return NextResponse.json({ message: "Skill updated" }, { status: 200 })
    
}