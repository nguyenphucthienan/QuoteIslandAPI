const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page - 1, 10));
  const offset = parseInt(req.query.offset, 10) || 5;

  const categories = await categoryService.getCategories(page, offset);
  return res.send(categories);
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
