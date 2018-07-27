var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  gender: String,
  age: Number,
  city: String,
  job: String
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
