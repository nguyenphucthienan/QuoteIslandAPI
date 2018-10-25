const authorService = require('../services/authorService');
const Pagination = require('../helpers/Pagination');
const ServiceHelpers = require('../helpers/ServiceHelpers');

exports.getAuthors = async (req, res) => {
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const { filter, sort } = req.query;
  const filterObj = ServiceHelpers.createAuthorFilterObject(filter);
  const sortObj = ServiceHelpers.createSortObject(sort);

  const authors = await authorService.getAuthors(pageNumber, pageSize, filterObj, sortObj);
  const totalItems = await authorService.countAuthors(filterObj);

  const data = {
    items: authors,
    pagination: new Pagination(pageNumber, pageSize, totalItems)
  };

  return res.send(data);
};

exports.getAuthor = async (req, res) => {
  const { id } = req.params;

  const author = await authorService.getAuthorById(id);

  if (!author) {
    return res.status(404).send();
  }

  return res.send(author);
};

exports.createAuthor = async (req, res) => {
  const author = await authorService.createAuthor(req.body);
  return res.send(author);
};

exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;

  const author = await authorService.deleteAuthorById(id);

  if (!author) {
    return res.status(404).send();
  }

  return res.send(author);
};

exports.loveAuthor = async (req, res) => {
  const { id } = req.params;
  const { id: currentUserId } = req.user;

  const author = await authorService.getAuthorById(id);

  if (!author) {
    return res.status(404).send();
  }

  const loves = author.loves.map(obj => obj.toString());
  const operator = loves.includes(currentUserId) ? '$pull' : '$addToSet';

  await authorService.loveAuthor(id, currentUserId, operator);
  const returnAuthor = await authorService.getAuthorById(id);

  return res.send(returnAuthor);
};
