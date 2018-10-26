const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

exports.getComments = (pageNumber, pageSize, filterObj, sortObj) => (
  Comment.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        quote: 1,
        content: 1,
        'user._id': 1,
        'user.username': 1,
        'user.firstName': 1,
        'user.lastName': 1,
        'user.photoUrl': 1
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
);

exports.getCommentById = (id) => {
  const _id = mongoose.Types.ObjectId(id);

  return Comment.aggregate([
    { $match: { _id } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        quote: 1,
        content: 1,
        'user._id': 1,
        'user.username': 1,
        'user.firstName': 1,
        'user.lastName': 1
      }
    },
  ])
    .then(result => result[0]);
};

exports.createComment = (comment) => {
  const newComment = new Comment({ ...comment });
  return newComment.save();
};

exports.deleteCommentById = id => (
  Comment.findByIdAndDelete(id).exec()
);

exports.countComments = filterObj => (
  Comment.find(filterObj)
    .then(comments => comments.length)
);
