const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

const router = express.Router();
const EXPIRY_INTERVAL = 1000 * 60  * 5;
const secret = process.env.SECRET;

router
  .post('/register', (req, res) => {
    const { organization, email, password } = req.body;
    const user = new User({
      organization,
      email,
      password,
    });
    user
      .save()
      .then(savedUser => {
        res.status(200).json(savedUser);
      }).catch(err => res.status(500).json(err));
  })
  .post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(401).json({ message: 'Please provide both an email address and a password to log in.'})
    }
    User
      .findOne({ email })
      .then(loggedInUser => {
        loggedInUser
          .validify(password)
          .then(youShallPass => {
            if (!youShallPass) {
              return res.status(401).json({ message: 'Incorrect email address and/or password.'})
            }
            const payload = {
              sub: loggedInUser._id,
              exp: Date.now() + EXPIRY_INTERVAL,
            };
            const token = jwt.sign(payload, secret);
            res.status(200).json({ token, loggedInUser });
          });
      });
  })
  .get('/profile', passport.use('Bearer'), (req, res) => {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: 'You are not logged in.'})
    }
    res.status(200).json({ loggedInUser });
  });