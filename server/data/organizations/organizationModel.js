const mongoose = require('mongoose');
require('mongoose-type-url');


const OrganizationSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
