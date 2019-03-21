const express = require('express'),
      router = express.Router();
const { isApiLoggedIn } = require('../../middleware/auth');

router.use('/user', isApiLoggedIn, require('./user'));

module.exports = router;
