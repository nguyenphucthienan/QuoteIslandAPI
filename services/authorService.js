const mongoose = require('mongoose');
const Author = mongoose.model('Author');

exports.getAuthors = (pageNumber, pageSize, sortObj) => (
  Author.find()
    .sort(sortObj)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec()
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

exports.countAuthors = () => Author.countDocuments().exec();
