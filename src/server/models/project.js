const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  number: String,
  name: String,
  client: String,
});

module.exports = mongoose.model('Project', schema);
