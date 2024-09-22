import mongoose from 'mongoose';

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
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
}

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter({ downloadCount: 0 });
      await counter.save();
    }
    res.status(200).json({ downloadCount: counter.downloadCount });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch download count -- ${error}` });
  }
}
