const _ = require('lodash');
const mongoose = require('mongoose');
const Role = mongoose.model('Role');
const Category = mongoose.model('Category');

const RoleNames = require('../constants/RoleNames');
const categoriesData = require('./categories.json');

function seedRoles() {
  _.each(RoleNames, async (roleName) => {
    const role = await Role.findOne({ name: roleName });

    if (!role) {
      const newRole = new Role({ name: roleName });
      await newRole.save();
    }
  });
}

function seedCategories() {
  categoriesData.forEach(async (categoryData) => {
    const category = await Category.findOne({
      name: categoryData.name
    });

    if (!category) {
      const newCategory = new Category({ ...categoryData });
      await newCategory.save();
    }
  });
}

seedRoles();
seedCategories();
