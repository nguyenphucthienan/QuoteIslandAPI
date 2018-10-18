const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const {
  requireLocalAuth,
  requireJwtAuth
} = require('../middlewares/passportAuth');

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

module.exports = router;
