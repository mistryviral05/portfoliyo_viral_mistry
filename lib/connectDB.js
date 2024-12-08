import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw new Error('Error connecting to MongoDB');
    }
};

export default connectDB;
