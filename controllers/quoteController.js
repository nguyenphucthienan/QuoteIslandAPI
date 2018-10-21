const quoteService = require('../services/quoteService');
const Pagination = require('../helpers/Pagination');

exports.getQuotes = async (req, res) => {
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const quotes = await quoteService.getQuotes(pageNumber, pageSize);
  const totalItems = await quoteService.countQuotes();

  const data = {
    items: quotes,
    pagination: new Pagination(pageNumber, pageSize, totalItems)
  };

  return res.send(data);
};

exports.getQuote = async (req, res) => {
  const { id } = req.params;

  const quote = await quoteService.getQuoteById(id);

  if (!quote) {
    return res.status(404).send();
  }

  return res.send(quote);
};

exports.createQuote = async (req, res) => {
  const quote = await quoteService.createQuote(req.body);
  const returnQuote = await quoteService.getQuoteById(quote.id);

  return res.send(returnQuote);
};

exports.deleteQuote = async (req, res) => {
  const { id } = req.params;

  const quote = await quoteService.deleteQuoteById(id);

  if (!quote) {
    return res.status(404).send();
  }

  return res.send(quote);
};
