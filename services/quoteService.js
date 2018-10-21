const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');

exports.getQuotes = (pageNumber, pageSize, sortObj) => (
  Quote.find()
    .sort(sortObj)
    .populate('author', '_id fullName')
    .populate('categories', '_id name')
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
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

exports.countQuotes = () => Quote.countDocuments().exec();
