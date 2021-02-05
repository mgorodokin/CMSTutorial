const express = require('express');
const { deletePost } = require('../controllers/adminController');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.all('/*', (req, res, next) => {
    
    req.app.locals.layout = 'admin';

    next();
})


router.route('/')
    .get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);

router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);

router.route('/posts/edit/:id')
    .get(adminController.editPost)
    .put(adminController.editPostSubmit);

router.route('/posts/delete/:id')
    .delete(adminController.deletePost);

/* Admin category routes */
router.route('/category')
    .get(adminController.getCategories)
    .post(adminController.createCategories);

router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);

router.route('/category/delete/:id')
      .delete(adminController.deleteCategory);

    module.exports = router;


