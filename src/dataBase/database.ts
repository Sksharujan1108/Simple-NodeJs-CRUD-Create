import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../config/config.env') });

// Access the MONGO_URI from the environment variables
const MONGO_URI: string | undefined = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

console.log('MONGO_URI:', MONGO_URI);

// Connect to MongoDB
const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log('Successfully connected to the User database');
  } catch (error) {
    console.error('Database Connection Failed', error);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDatabase function
export default connectDatabase;
