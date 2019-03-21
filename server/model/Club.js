const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  "id": Number,
  "name": String,
  "profile_medium": String,
  "profile": String,
  "cover_photo": String,
  "cover_photo_small": String,
  "sport_type": String,
  "city": String,
  "state": String,
  "country": String
});

const Model = mongoose.model('Club', Schema);

module.exports = {
  ClubModel: Model,
  ClubSchema: Schema
};
