module.exports = roleName => (req, res, next) => {
  const isAuthorized = req.user.roles.some(role => role.name === roleName);

  if (!isAuthorized) {
    return res.status(403).send({ message: 'You do not have permission to do this' });
  }

  return next();
};
