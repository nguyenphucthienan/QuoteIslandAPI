const roleService = require('../services/roleService');

exports.getRoles = async (req, res) => {
  const roles = await roleService.getRoles();
  return res.send(roles);
};

exports.getRole = async (req, res) => {
  const { id } = req.params;

  const role = await roleService.getRoleById(id);
  return res.send(role);
};

exports.createRole = async (req, res) => {
  const role = await roleService.createRole(req.body);
  return res.send(role);
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  const role = await roleService.deleteRoleById(id);
  return res.send(role);
};
