import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const uri = process.env.MONGO_BD as string;
    await mongoose.connect(uri);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
  }
}
