var express = require("express");
var cors = require("cors");
var session = require("express-session");
var mongoose = require("mongoose");
var Patient = require("./models").Patient;
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

function addPatient(data) {
  var patient = new Patient(data);
  patient
    .save()
    .then((doc) => {
      console.log(doc);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

app.get("/patient/login-status", (req, res) => {
  console.log(req.sessionID);
  if (req.session.user_id) {
    res.json({ status: true, user_id: req.session.user_id });
  } else {
    res.json({ status: false, user_id: undefined });
  }
});

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
        });
      }
    }
  );
});
app.post("/patient/signup", (req, res) => {
  var data = req.body;
  console.log(data);
  if (addPatient(data)) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

app.get("/patient/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.json({ status: true });
    }
  });
});

app.listen(5000);
