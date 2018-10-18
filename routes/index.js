const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');

const {
  requireLocalAuth,
  requireJwtAuth
} = require('../middlewares/passportAuth');

const requireRole = require('../middlewares/requireRole');
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
  requireRole(RoleNames.ADMIN),
  roleController.getRoles);

module.exports = router;
