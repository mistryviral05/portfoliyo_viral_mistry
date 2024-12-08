import mongoose from 'mongoose';

const connectDB = async () => {
    // Check if already connected to avoid reconnecting
    if (mongoose.connection.readyState) {
        console.log('Already connected to MongoDB');
        return;
    }

    // Ensure the environment variable is defined
    if (!process.env.MONGODB_URI) {
        throw new Error('Missing MONGODB_URI environment variable');
    }

    try {
        // Connect to the database
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw new Error('Error connecting to MongoDB');
    }
};

export default connectDB;
