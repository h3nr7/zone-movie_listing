const mongoose = require('mongoose');


exports.initDB = function() {
  const url = 'mongodb://nodejs:Password1234@portal-ssl2318-0.puggo-calendar-dev.4087823473.composedb.com:19691,portal-ssl2030-2.puggo-calendar-dev.4087823473.composedb.com:19691/puggo-calendar-dev-db?authSource=admin&ssl=true';
  const options = {
    // ssl: true,
    // sslValidate: false,
    // // sslCA: [process.env.COMPOSE_MONGO_CA],
    // // ca: [process.env.COMPOSE_MONGO_CA],
    poolSize: 5,
    reconnectTries: 1,
    useNewUrlParser: true
    // socketOptions: {keepAlive: 1, connectTimeoutMS: 30000},
    // auto_reconnect: true,
  };
  return mongoose.connect(url, options)
    .then(function(obj){
      console.log('mongo success: ');
    })
    .catch(function(err) {
      console.log('mongo error: ', err);
    });
};
