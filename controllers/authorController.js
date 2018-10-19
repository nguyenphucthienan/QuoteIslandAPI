const authorService = require('../services/authorService');

exports.getAuthors = async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page - 1, 10));
  const offset = parseInt(req.query.offset, 10) || 5;

  const authors = await authorService.getAuthors(page, offset);
  return res.send(authors);
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
