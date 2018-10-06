const mongoose = require('mongoose');

const StrikeSchema = new mongoose.Schema({
  reportingOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  company: { type: String, required: true, maxlength: 64 },
  industry: { type: String, required: true, maxLength: 64 },
  summary: { type: String, required: true, maxLength: 128 },
  context: { type: String }
});

module.exports = new Model('Strike', StrikeSchema);