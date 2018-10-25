const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');

exports.getQuotes = (pageNumber, pageSize, filterObj, sortObj) => (
  Quote.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      },
    },
    {
      $unwind: '$author'
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories'
      },
    },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        text: 1,
        loves: 1,
        loveCount: { $size: '$loves' },
        'author._id': 1,
        'author.fullName': 1,
        'categories._id': 1,
        'categories.name': 1
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
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

exports.countQuotes = filterObj => (
  Quote.find(filterObj)
    .then(quotes => quotes.length)
);

exports.loveQuote = (id, currentUserId, operator) => (
  Quote.findByIdAndUpdate(id,
    { [operator]: { loves: currentUserId } },
    { new: true })
);
