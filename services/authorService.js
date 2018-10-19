const mongoose = require('mongoose');
const Author = mongoose.model('Author');

exports.getAuthors = (page, offset) => (
  Author.find()
    .sort({
      fullName: 1,
      updatedAt: -1
    })
    .skip(page * offset)
    .limit(offset)
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
