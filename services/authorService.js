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
        as: 'quoteCount' // name for overwriting
      },
    },
    {
      $addFields: {
        quoteCount: { $size: '$quoteCount' } // overwrite quoteCount field
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
);

exports.getAuthorById = id => (
  Author.findById(id).exec()
);

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
