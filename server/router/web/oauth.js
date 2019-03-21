const passport = require('passport'),
      express = require('express'),
      router = express.Router();


router.get('/strava', passport.authenticate('strava', { scope: ['public'] }));

router.get('/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
