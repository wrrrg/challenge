const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  token: String,
});

module.exports = mongoose.model('User', schema);
