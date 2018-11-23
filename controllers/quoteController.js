const quoteService = require('../services/quoteService');
const Pagination = require('../helpers/Pagination');
const ServiceHelpers = require('../helpers/ServiceHelpers');

exports.getQuotes = async (req, res) => {
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const { filter, sort } = req.query;
  const filterObj = ServiceHelpers.createQuoteFilterObject(filter);
  const sortObj = ServiceHelpers.createSortObject(sort);

  const quotes = await quoteService.getQuotes(pageNumber, pageSize, filterObj, sortObj);
  const totalItems = await quoteService.countQuotes(filterObj);

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

exports.updateQuote = async (req, res) => {
  const { id } = req.params;

  const quote = await quoteService.updateQuoteById(id, req.body);

  if (!quote) {
    return res.status(404).send();
  }

  return res.send(quote);
};

exports.deleteQuote = async (req, res) => {
  const { id } = req.params;

  const quote = await quoteService.deleteQuoteById(id);

  if (!quote) {
    return res.status(404).send();
  }

  return res.send(quote);
};

exports.loveQuote = async (req, res) => {
  const { id } = req.params;
  const { id: currentUserId } = req.user;

  const quote = await quoteService.getQuoteById(id);

  if (!quote) {
    return res.status(404).send();
  }

  const loves = quote.loves.map(obj => obj.toString());
  const operator = loves.includes(currentUserId) ? '$pull' : '$addToSet';

  await quoteService.loveQuote(id, currentUserId, operator);
  const returnQuote = await quoteService.getQuoteById(id);

  return res.send(returnQuote);
};

exports.getRandomQuotes = async (req, res) => {
  const size = Math.max(0, parseInt(req.query.size, 10)) || 5;
  const quotes = await quoteService.getRandomQuotes(size);

  return res.send(quotes);
};


exports.getRandomQuotesByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  const size = Math.max(0, parseInt(req.query.size, 10)) || 5;
  const quotes = await quoteService.getRandomQuotesByCategoryId(categoryId, size);

  return res.send(quotes);
};
