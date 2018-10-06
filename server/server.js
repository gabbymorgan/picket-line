// node modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');
const strategies = require('./data/strategies');

// local files
const organizationRouter = require('./data/organizations/organizationRoutes');
const strikeRouter = require('./data/strikes/strikeRoutes');
const userRouter = require('./data/users/userRoutes');
// const Employer = require('./server/users/employer/employerModel');

const server = express();

const originUrl = process.env.ALLOWED_URLS.split(' ');

const corsOptions = {
  origin: (originUrl),
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
server.use(morgan());
server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());
server.use(passport.initialize());
server.use(passport.session());

strategies();


// routes begin
server.use('/api/organizations', organizationRouter);
server.use('/api/strikes', strikeRouter);
server.use('/api/users', userRouter);
// routes end

module.exports = server;
