import mongoose from 'mongoose';
import 'dotenv/config';

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Mongo OK');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
