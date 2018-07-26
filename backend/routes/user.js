const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection Succeeded");
});

var User = require("./models/user");

// Add new user
router.post('/register', (req, res) => {
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
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
