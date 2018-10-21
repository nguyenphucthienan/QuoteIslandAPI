const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getCategories = (pageNumber, pageSize, sortObj) => (
  Category.find()
    .sort(sortObj)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
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

exports.countCategories = () => Category.countDocuments().exec();
