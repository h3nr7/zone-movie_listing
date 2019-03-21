const express = require('express');
// const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
// const StravaOAuth = require('./helper/StravaOAuth');
const appInfo = require('../package.json');
const { name, version } = appInfo;
const { apiErrorHandler } = require('./helper/errorHandler');
// const { setAuthHeader } = require('./middleware/auth');
// const { redisSession } = require('./middleware/redis');
const { initDB } = require('./model');

// OAUTH STRATEGY
// StravaOAuth(passport);

// INITIALISE DB
initDB();
// INITIALISE EXPRESS
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(redisSession);
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(setAuthHeader);

// ROUTES
// app.use(require('./router'));

// WEB SERVER
if(process.env.NODE_ENV==='development') {
  const webpackDev = require('./middleware/webpack/wp-dev');
  const webpackHot = require('./middleware/webpack/wp-hot');

  app.use('/', webpackDev);
  app.use('/', webpackHot);
  app.use('/*', webpackDev);
  app.use('/*', webpackHot);
} else {
  app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
  app.use('/', express.static('static'));
  app.use('/*', express.static('static'));
}


// ERROR HANDLER AND LOGGERS
app.use(methodOverride());
app.use(apiErrorHandler);


// INIT APP
app.listen(process.env.PORT, function() {
  console.log(`:: ${name} v${version} - Initialised at port ${process.env.PORT} `);
});
