const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  description: String,
  billable: Boolean,
  categories: [{ id: Number, title: String, selected: Boolean }],
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  timeStart: Date,
  timeEnd: Date,
});

module.exports = mongoose.model('TimeEntry', schema);
