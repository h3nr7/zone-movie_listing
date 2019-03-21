

exports.setAuthHeader = function(req, res, next) {
  const { accessToken, profile } = req.user || {};
  res.setHeader("Access-Control-Allow-Headers", 'Authorization');
  res.setHeader("Authorization", `Bearer ${accessToken || ''}`);
  return next();
};

exports.isApiLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  next({status: 401, message: 'Action not autorised'});
};
