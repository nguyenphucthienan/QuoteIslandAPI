const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true
  },
  description: {
    type: String
  },
  photoUrl: {
    type: String,
    trim: true
  }
}, { timestamps: true });

mongoose.model('Category', categorySchema);
