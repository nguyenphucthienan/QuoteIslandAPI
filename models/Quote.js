const mongoose = require('mongoose');
const { Schema } = mongoose;

const quoteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    require: 'Author is required'
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  quoteText: {
    type: String,
    require: 'Quote is required',
    trim: true
  },
  loves: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

mongoose.model('Quote', quoteSchema);
