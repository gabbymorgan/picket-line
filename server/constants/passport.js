const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;
const secret = process.env.SECRET_KEY;

const User = require('./users/UserModel');

function strategies() {
  // serialize/deserialize users
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((userId, done) => {
    user.findById(userId, (err, user) => done(err, user));
  });

  // strategy for handling requests for restricted endpoints
  // checks for JWT on Bearer token in Auth headers
  passport.use(new BearerStrategy((token, done) => {
    const { sub, exp } = jwt.verify(token, secret);
    // check if expired
    if (exp <= Date.now()) {
      return done(null, false);
    }
    User
      .findById(sub) // search users
      .select('-password -createdOn -__v')
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      }).catch(() => done(null, false));
  }));
}

module.exports = strategies;
