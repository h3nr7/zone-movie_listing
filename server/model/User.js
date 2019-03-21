const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = new mongoose.Schema({
  id: String,
  username: String,
  firstname: String,
  lastname: String,
  created_at: Date,
  modified_at: Date
});

// PLUGIN
Schema.plugin(findOrCreate);

const Model = mongoose.model('User', Schema);

module.exports = {
  UserModel: Model,
  UserSchema: Schema
};
