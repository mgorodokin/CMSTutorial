const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

router.route('/')
      .get(defaultController.index);

router.route('/login')
    .get(defaultController.loginGet)
    .post(defaultController.loginPost);

module.exports = router;