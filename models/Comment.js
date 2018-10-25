const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  quote: {
    type: Schema.Types.ObjectId,
    ref: 'Quote',
    required: 'Quote cannot be blank'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'User is required'
  },
  content: {
    type: String,
    require: 'Content is required',
    trim: true
  }
}, { timestamps: true });

mongoose.model('Comment', commentSchema);
