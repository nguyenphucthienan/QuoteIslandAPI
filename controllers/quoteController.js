const quoteService = require('../services/quoteService');

exports.getQuotes = async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page - 1, 10));
  const offset = parseInt(req.query.offset, 10) || 5;

  const quotes = await quoteService.getQuotes(page, offset);
  return res.send(quotes);
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
