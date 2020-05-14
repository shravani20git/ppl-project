var mongoose = require("mongoose");
//var con = require("./connection.js");
let patient = mongoose.Schema({
  name: { type: String, required: true },
  profile_img: {
    type: String,
    required: true,
    default: "/public/profile_images/default.jpg",
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

let doctor = mongoose.Schema({
  name: { type: String, required: true },
  profile_img: {
    type: String,
    required: true,
    default: "/public/profile_images/default.jpg",
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = { Patient: mongoose.model("patient", patient) };
//module.exports = {userModel = mongoose.model('Email', userShema)}
