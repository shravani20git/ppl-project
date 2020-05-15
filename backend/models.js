var mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
  working_hrs: {
    from: { type: String, required: true, default: "00:00" },
    to: { type: String, required: true, default: "23:99" },
  },
  appointments: [{ type: Schema.Types.ObjectId, ref: "appointments" }],
});

let appointments = mongoose.Schema({
  _patientId: { type: Schema.Types.ObjectId, ref: "patient" },
  _doctorId: { type: Schema.Types.ObjectId, ref: "doctor" },
  date: { type: Schema.Types.Date },
  slot: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
});
module.exports = {
  Patient: mongoose.model("patient", patient),
  Doctor: mongoose.model("doctor", doctor),
  Appointments: mongoose.model("appointments", appointments),
};
//module.exports = {userModel = mongoose.model('Email', userShema)}
