const roleService = require('../services/roleService');

exports.getRoles = async (req, res) => {
  const roles = await roleService.getRoles();
  return res.send(roles);
};
