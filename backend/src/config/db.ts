import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB Atlas connected');
    console.log('Connected to DB:', mongoose.connection.name);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
  
};
