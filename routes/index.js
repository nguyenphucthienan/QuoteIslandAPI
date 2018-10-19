const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');

const {
  requireLocalAuth,
  requireJwtAuth
} = require('../middlewares/passportAuth');

const requireRoles = require('../middlewares/requireRoles');
const RoleNames = require('../constants/RoleNames');

router.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

router.post('/auth/register', authController.register);

router.post('/auth/check-username', authController.checkUsername);

router.post('/auth/login',
  requireLocalAuth,
  authController.logIn);

router.get('/auth/me',
  requireJwtAuth,
  authController.currentUser);

router.get('/roles',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  roleController.getRoles);

module.exports = router;
