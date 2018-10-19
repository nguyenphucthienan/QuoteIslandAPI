const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const authorController = require('../controllers/authorController');
const categoryController = require('../controllers/categoryController');
const quoteController = require('../controllers/quoteController');
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

router.get('/roles/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.getRole));

router.post('/roles',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.createRole));

router.delete('/roles/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.deleteRole));

router.get('/authors',
  catchErrors(authorController.getAuthors));

router.get('/authors/:id',
  catchErrors(authorController.getAuthor));

router.post('/authors',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(authorController.createAuthor));

router.delete('/authors/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(authorController.deleteAuthor));

router.get('/categories',
  catchErrors(categoryController.getCategories));

router.get('/categories/:id',
  catchErrors(categoryController.getCategory));

router.post('/categories',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(categoryController.createCategory));

router.delete('/categories/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(categoryController.deleteCategory));

router.get('/quotes',
  catchErrors(quoteController.getQuotes));

router.get('/quotes/:id',
  catchErrors(quoteController.getQuote));

router.post('/quotes',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(quoteController.createQuote));

router.delete('/quotes/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN, RoleNames.MODERATOR]),
  catchErrors(quoteController.deleteQuote));

module.exports = router;
