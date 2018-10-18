const mongoose = require('mongoose');
const Role = mongoose.model('Role');

exports.getRoles = () => Role.find().exec();
