const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const authorController = require('../controllers/authorController');
const categoryController = require('../controllers/categoryController');

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

router.get('/authors', authorController.getAuthors);

router.get('/authors/:id', authorController.getAuthor);

router.post('/authors',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  authorController.createAuthor);

router.get('/categories', categoryController.getCategories);

router.get('/categories/:id', categoryController.getCategory);

router.post('/categories',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  categoryController.createCategory);

module.exports = router;
