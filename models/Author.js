const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  fullName: {
    type: String,
    required: 'Full name is required',
    trim: true
  },
  born: {
    type: Date,
  },
  died: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  description: {
    type: String
  },
  photoUrl: {
    type: String,
    trim: true
  },
  loves: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

mongoose.model('Author', authorSchema);
