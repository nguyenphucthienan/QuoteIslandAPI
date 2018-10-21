const categoryService = require('../services/categoryService');
const Pagination = require('../helpers/Pagination');

exports.getCategories = async (req, res) => {
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const categories = await categoryService.getCategories(pageNumber, pageSize);
  const totalCount = await categoryService.countCategories();

  const data = {
    items: categories,
    pagination: new Pagination(totalCount, pageNumber, pageSize)
  };

  return res.send(data);
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return res.status(404).send();
  }

  return res.send(category);
};

exports.createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return res.send(category);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await categoryService.deleteCetagoryById(id);

  if (!category) {
    return res.status(404).send();
  }

  return res.send(category);
};
