var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection Succeeded");
});

var User = require("./models/user");

// Add new user
app.post('/register', (req, res) => {
  var db = req.db;
  var gender = req.body.gender;
  var age = req.body.age;
  var city = req.body.city;
  var job = req.body.job;

  var new_user = new User({
    gender: gender,
    age: age,
    city: city,
    job: job
  })

  new_user.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'User registered successfully!'
    })
  })
})

module.exports = app;
