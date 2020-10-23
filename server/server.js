const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
//import mongoose
const mongoose = require('mongoose');

//import pusher
const pusherService = require('./utils/database');

//import the user router
const userRouter = require('./routes/user');

const app = express();
app.use(logger('dev'));

//Passing through body parser middleware so that the request body can be read
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//handle cors policy
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error response
  res.status(err.status || 500);
  res.send('error');
});

const port = process.env.PORT || 3000;
mongoose.connect('', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(connection => {
    pusherService.activatePusher;
    app.listen(port);
    console.log('listening on port : ' + port);
  })
  .catch(err => console.log(err));