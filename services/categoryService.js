const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getCategories = (page, offset) => (
  Category.find()
    .sort({
      name: 1,
      updatedAt: -1
    })
    .skip(page * offset)
    .limit(offset)
    .exec()
);

exports.getCategoryById = id => (
  Category.findById(id).exec()
);

exports.createCategory = (category) => {
  const newCategory = new Category({ ...category });
  return newCategory.save();
};

exports.deleteCetagoryById = id => (
  Category.findByIdAndDelete(id).exec()
);
