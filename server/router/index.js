const express = require('express'),
      router = express.Router();


 router.use(`/api/${process.env.API_VERSION}`, require('./api')),
 router.use('/', require('./web'));

module.exports = router;
