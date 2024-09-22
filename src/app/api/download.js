import { join } from 'path';
import { promises as fs } from 'fs';
import mongoose from 'mongoose';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

const counterSchema = new mongoose.Schema({
  downloadCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

async function connectToDatabase() {
  if (!mongoose.connection.readyState) {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  } else {
    console.log("Already connected to MongoDB");
  }
}

export default async function handler(req, res) {
  await connectToDatabase();
  
  // Find or create the download counter
  let counter = await Counter.findOne();
  if (!counter) {
    counter = new Counter({ downloadCount: 0 });
  }

  // Increment the download counter
  counter.downloadCount += 1;
  await counter.save();

  console.log(`Download count: ${counter.downloadCount}`);

  // Get the path to the Rust binary file
  const filePath = join(process.cwd(), 'public', 'bin', 'my_tool'); // Adjust the path as needed

  // Read the binary file
  const fileBuffer = await fs.readFile(filePath);

  // Set appropriate headers to force a download
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename="my_tool"');

  // Send the binary file to the client
  res.send(fileBuffer);
}
