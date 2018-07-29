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

var User = require("../models/user");

// 회원 정보 추가
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

// 모든 회원 정보 읽어 오기
router.get('/list', (req, res) => {
  User.find({}, 'gender age city job', function (error, users) {
    if (error) { console.error(error); }
    res.send({
        users: users
    })
  }).sort({_id:-1})
})

// 한 명의 회원 정보 읽어 오기
router.get('/:id', (req, res) => {
  var db = req.db;
  User.findById(req.params.id, 'gender age city job', function (error, user) {
    if (error) { console.error(error); }
    res.send(user)
  })
})

// 회원 정보 업데이트
router.put('/:id', (req, res) => {
  var db = req.db;
  User.findById(req.params.id, 'gender age city job', function (error, user) {
    if (error) { console.error(error) }

    user.gender = req.body.gender
    user.age = req.body.age
    user.city = req.body.city
    user.job = req.body.job

    user.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// 회원 정보 삭제
router.delete('/:id', (req, res) => {
  var db = req.db;
  User.remove({
    _id: req.params.id
  }, function(err, user){
    if(err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

module.exports = router;
