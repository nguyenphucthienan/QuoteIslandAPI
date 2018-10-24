const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getCategories = (pageNumber, pageSize, filterObj, sortObj) => (
  Category.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'categories',
        as: 'quoteCount' // name for overwriting
      },
    },
    {
      $addFields: {
        quoteCount: { $size: '$quoteCount' } // overwrite quoteCount field
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
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

exports.countCategories = filterObj => (
  Category.find(filterObj)
    .then(categories => categories.length)
);
