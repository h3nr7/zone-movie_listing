const { getStravaUserProfile } = require('../../service/stravaApi');
const { UserModel } = require('../../model/User');

exports.getUserProfile = function(req, res, next) {
  const { accessToken } = req.user || {};
  return getStravaUserProfile(accessToken)
    .then(function(obj) {
      const { data } = obj || {};
      const { id, firstname, lastname, username } = data || {};
      console.log('am I called', id, firstname, lastname, username);
      UserModel.findOrCreate({id}, {firstname, lastname, username}, {}, function(err, user, created){
        console.log('I am called man:', err, user, created);
      });
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    });
};

exports.saveUserProfile = function(req, res, next) {

};
