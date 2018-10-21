const authorService = require('../services/authorService');
const Pagination = require('../helpers/Pagination');

exports.getAuthors = async (req, res) => {
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const authors = await authorService.getAuthors(pageNumber, pageSize);
  const totalCount = await authorService.countAuthors();

  const data = {
    items: authors,
    pagination: new Pagination(totalCount, pageNumber, pageSize)
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
