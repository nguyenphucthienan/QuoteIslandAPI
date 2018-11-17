const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const CategoryConstants = require('../constants/CategoryContants');

exports.getCategories = (pageNumber, pageSize, filterObj, sortObj) => (
  Category.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'categories',
        as: 'quoteCount'
      },
    },
    {
      $addFields: {
        quoteCount: { $size: '$quoteCount' }, // overwrite quoteCount field
        loveCount: { $size: '$loves' }
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
);

exports.getCategoryById = (id) => {
  const _id = mongoose.Types.ObjectId(id);

  return Category.aggregate([
    { $match: { _id } },
    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'categories',
        as: 'quoteCount'
      },
    },
    {
      $addFields: {
        quoteCount: { $size: '$quoteCount' },
        loveCount: { $size: '$loves' }
      }
    }
  ])
    .then(result => result[0]);
};

exports.createCategory = (category) => {
  const newCategory = new Category({ ...category });
  return newCategory.save();
};

exports.updateCategoryById = (id, category) => (
  Category.findByIdAndUpdate(id, category, { new: true }).exec()
);

exports.deleteCetagoryById = id => (
  Category.findByIdAndDelete(id).exec()
);

exports.countCategories = filterObj => (
  Category.find(filterObj)
    .then(categories => categories.length)
);

exports.loveCategory = (id, currentUserId, operator) => (
  Category.findByIdAndUpdate(id,
    { [operator]: { loves: currentUserId } },
    { new: true })
);

exports.getFeaturedCategories = () => (
  CategoryConstants.featuredCategoryNames
    .map(async name => (
      Category.aggregate([
        { $match: { name } },
        {
          $project: {
            _id: 1,
            name: 1
          }
        }
      ])
    ))
);
