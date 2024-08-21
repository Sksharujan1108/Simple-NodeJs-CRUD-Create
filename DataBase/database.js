const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../config/config.env') });

// Access the MONGO_URI from the environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

console.log('MONGO_URI:', MONGO_URI);

// Connect to MongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    });
    console.log('Successfully connected to the User database');
  } catch (error) {
    console.error('Database Connection Failed', error);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDatabase function
module.exports = connectDatabase;
