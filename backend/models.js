var mongoose = require("mongoose");
//var con = require("./connection.js");
let patient = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

module.exports = { Patient: mongoose.model("patient", patient) };
//module.exports = {userModel = mongoose.model('Email', userShema)}
