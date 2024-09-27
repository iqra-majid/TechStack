import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGOURI

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, {
     
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export default connectToMongo;
