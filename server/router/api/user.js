const express = require('express'),
      router = express.Router();
const { getUserProfile } = require('../../controller/api/user');


router.get('/profile', getUserProfile);

module.exports = router;
