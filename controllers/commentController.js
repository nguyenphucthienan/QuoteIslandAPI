const commentService = require('../services/commentService');
const Pagination = require('../helpers/Pagination');
const ServiceHelpers = require('../helpers/ServiceHelpers');

exports.getCommentsForQuote = async (req, res) => {
  const { quoteId } = req.params;
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const { filter, sort } = req.query;
  const filterObj = ServiceHelpers.createCommentFilterObject(quoteId, filter);

  const sortObj = ServiceHelpers.createSortObject(sort);

  const comments = await commentService.getComments(pageNumber, pageSize, filterObj, sortObj);
  const totalItems = await commentService.countComments(filterObj);

  const data = {
    items: comments,
    pagination: new Pagination(pageNumber, pageSize, totalItems)
  };

  return res.send(data);
};

exports.getComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await commentService.getCommentById(commentId);

  if (!comment) {
    return res.status(404).send();
  }

  return res.send(comment);
};

exports.createComment = async (req, res) => {
  const { quoteId } = req.params;
  const { id: currentUserId } = req.user;
  const { content } = req.body;

  const newComment = {
    quote: quoteId,
    user: currentUserId,
    content
  };

  const comment = await commentService.createComment(newComment);
  const returnComment = await commentService.getCommentById(comment._id);

  return res.send(returnComment);
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  const comment = await commentService.deleteCommentById(id);

  if (!comment) {
    return res.status(404).send();
  }

  return res.send(comment);
};
