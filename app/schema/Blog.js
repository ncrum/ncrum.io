import mongoose from 'mongoose';
import thunkify from 'thunkify';

const blog = new mongoose.Schema({
  title: String,
  body: String,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('blog', blog);
