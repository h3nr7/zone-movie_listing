const { Strategy } = require('passport-strava-oauth2');

function StravaOAuth(passport) {
  passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + '/oauth/strava/callback'
  }, function(accessToken, refreshToken, profile, cb) {
    return cb(null, {accessToken, refreshToken, profile});
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}

module.exports = StravaOAuth;
