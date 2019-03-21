const express = require('express'),
      router = express.Router();


router.use('/oauth', require('./oauth'));

// router.get('/', function(req, res) {
//   const { accessToken, profile } = req.user || {};
//   const { displayName } = profile || {};
//   res.render('index')
// });

module.exports = router;
