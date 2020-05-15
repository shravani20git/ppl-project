var express = require("express");
var cors = require("cors");
var session = require("express-session");
var mongoose = require("mongoose");
var { Patient, Doctor } = require("./models");
app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "keyboard cat",
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: null },
  })
);

//mongoose connection
var url = "mongodb+srv://nachiket:1234@cluster0-iqj2s.mongodb.net/projectdb";
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error " + err);
  });

//### PATIENT ###
//patient login-check on every refresh
app.get("/patient/login-status", (req, res) => {
  console.log(req.sessionID);
  if (req.session.user_id) {
    res.json({
      status: true,
      user_id: req.session.user_id,
      user_type: "patient",
    });
  } else {
    res.json({ status: false, user_id: undefined, user_type: undefined });
  }
});
//patient login
app.post("/patient/login", (req, res) => {
  var data = req.body;
  console.log(data);
  Patient.findOne(
    { email: data.email, password: data.password },
    (err, doc) => {
      if (err || doc === null) {
        console.log(err);
        res.json({ status: false, msg: "unsuccessful", user_id: undefined });
      } else {
        console.log(req.sessionID);
        req.session.user_id = doc._id;
        res.json({
          status: true,
          msg: "successful",
          user_id: req.session.user_id,
          user_type: "patient",
        });
      }
    }
  );
});
//patient logout
app.get("/patient/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.json({ status: true });
    }
  });
});
//patient sign-up ## working of async await:- https://medium.com/javascript-in-plain-english/async-await-javascript-5038668ec6eb
async function addPatient(data) {
  var patient = new Patient(data);
  var x = false;
  await patient
    .save()
    .then((doc) => {
      console.log(doc);
      x = true;
    })
    .catch((err) => {
      console.log(err);
    });
  return x;
}
app.post("/patient/signup", (req, res) => {
  var data = req.body;
  console.log(data);
  addPatient(data).then((val) => {
    console.log(val);
    res.json({ status: val });
  });
});

// ### DOCTOR ###
//Doctor login-check on every refresh
app.get("/doctor/login-status", (req, res) => {
  console.log(req.sessionID);
  if (req.session.user_id) {
    res.json({
      status: true,
      user_id: req.session.user_id,
      user_type: "doctor",
    });
  } else {
    res.json({ status: false, user_id: undefined, user_type: undefined });
  }
});
//Doctor login
app.post("/doctor/login", (req, res) => {
  var data = req.body;
  console.log(data);
  Doctor.findOne({ email: data.email, password: data.password }, (err, doc) => {
    if (err || doc === null) {
      console.log(err);
      res.json({ status: false, msg: "unsuccessful", user_id: undefined });
    } else {
      console.log(req.sessionID);
      req.session.user_id = doc._id;
      res.json({
        status: true,
        msg: "successful",
        user_id: req.session.user_id,
        user_type: "doctor",
      });
    }
  });
});
//Doctor logout
app.get("/doctor/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.json({ status: true });
    }
  });
});
// Doctor Sign up
async function addDoctor(data) {
  var doctor = new Doctor(data);
  var x = false;
  await doctor
    .save()
    .then((doc) => {
      console.log(doc);
      x = true;
    })
    .catch((err) => {
      console.log(err);
    });
  return x;
}
app.post("/doctor/signup", (req, res) => {
  var data = req.body;
  console.log(data);
  addDoctor(data).then((val) => {
    console.log(val);
    res.json({ status: val });
  });
});

app.listen(5000);
