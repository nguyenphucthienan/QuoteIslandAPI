const mongoose = require('mongoose');
const Author = mongoose.model('Author');

exports.getAuthors = (pageNumber, pageSize, filterObj, sortObj) => (
  Author.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'author',
        as: 'quoteCount'
      },
    },
    {
      $addFields: {
        quoteCount: { $size: '$quoteCount' }, // overwrite quoteCount field
        loveCount: { $size: '$loves' }
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
);

exports.getAuthorById = (id) => {
  const _id = mongoose.Types.ObjectId(id);

  return Author.aggregate([
    { $match: { _id } },
    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'author',
        as: 'quoteCount'
      },
    },
    {
      $addFields: {
        quoteCount: { $size: '$quoteCount' },
        loveCount: { $size: '$loves' }
      }
    }
  ])
    .then(result => result[0]);
};

exports.createAuthor = (author) => {
  const newAuthor = new Author({ ...author });
  return newAuthor.save();
};

exports.deleteAuthorById = id => (
  Author.findByIdAndDelete(id).exec()
);

exports.countAuthors = filterObj => (
  Author.find(filterObj)
    .then(authors => authors.length)
);

exports.loveAuthor = (id, currentUserId, operator) => (
  Author.findByIdAndUpdate(id,
    { [operator]: { loves: currentUserId } },
    { new: true })
);
