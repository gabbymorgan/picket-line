/* eslint global-require: 0 */
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const server = require('./server/server');


server.use(express.static(path.join(__dirname, 'client/build')));
server
  .get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server/app/index is running ${port}`);