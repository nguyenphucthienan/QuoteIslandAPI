const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const authorController = require('../controllers/authorController');
const categoryController = require('../controllers/categoryController');
const { catchErrors } = require('../handlers/errorHandlers');

const {
  requireLocalAuth,
  requireJwtAuth
} = require('../middlewares/passportAuth');

const requireRoles = require('../middlewares/requireRoles');
const RoleNames = require('../constants/RoleNames');

router.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

router.post('/auth/register',
  catchErrors(authController.register));

router.post('/auth/check-username',
  catchErrors(authController.checkUsername));

router.post('/auth/login',
  requireLocalAuth,
  catchErrors(authController.logIn));

router.get('/auth/me',
  requireJwtAuth,
  catchErrors(authController.currentUser));

router.get('/roles',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.getRoles));

router.get('/authors',
  catchErrors(authorController.getAuthors));

router.get('/authors/:id',
  catchErrors(authorController.getAuthor));

router.post('/authors',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(authorController.createAuthor));

router.get('/categories',
  catchErrors(categoryController.getCategories));

router.get('/categories/:id',
  catchErrors(categoryController.getCategory));

router.post('/categories',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(categoryController.createCategory));

module.exports = router;
