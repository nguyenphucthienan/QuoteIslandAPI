const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');

exports.getQuotes = (page, offset) => (
  Quote.find()
    .sort({
      fullName: 1,
      updatedAt: -1
    })
    .populate('author', '_id fullName')
    .populate('categories', '_id name')
    .skip(page * offset)
    .limit(offset)
    .exec()
);

exports.getQuoteById = id => (
  Quote.findById(id)
    .populate('author', '_id fullName')
    .populate('categories', '_id name')
    .exec()
);

exports.createQuote = (quote) => {
  const newQuote = new Quote({ ...quote });
  return newQuote.save();
};

exports.deleteQuoteById = id => (
  Quote.findByIdAndDelete(id).exec()
);
