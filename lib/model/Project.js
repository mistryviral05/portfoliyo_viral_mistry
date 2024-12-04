import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Check if the model already exists, if not, create it
const Project = mongoose.models.Project || model("Project", userSchema);

export default Project;
