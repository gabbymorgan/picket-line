
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('mongoose-type-url');


const UserSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, required: true },
  password: { type: String, minlength: 8, required: true },
  email: { type: String, required: true, unique: true },
  submittedStrikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Strike' }],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  imgUrl: String,
});

UserSchema.pre('save', function hashPassword(next) {
  bcrypt.hash(this.password, 13, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

/* eslint func-names: 0 */
UserSchema.methods.validify = function validify(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', UserSchema);
