const axios = require('axios');
const URL = `${process.env.STRAVA_API_URL}/${process.env.STRAVA_API_VER}`;

exports.getStravaUserProfile = function(accessToken) {
  if(!accessToken) return Promise.reject();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };

  return axios({
    method: 'get',
    url: `${URL}/athlete`,
    headers
  });
};
