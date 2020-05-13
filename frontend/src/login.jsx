import React, { useState } from "react";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="col-sm-6 ">
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onBlur={(e) => {
              setEmail(e.target.value);
            }}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onBlur={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="loginType"
            value="doctor"
            onChange={(e) => {
              e.preventDefault();
              props.onLoginTypeChange(e.target.value);
            }}
          />
          <label className="form-check-label">Doctors Login.</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="loginType"
            value="patient"
            onChange={(e) => {
              e.preventDefault();
              props.onLoginTypeChange(e.target.value);
            }}
          />
          <label className="form-check-label">Patients Login.</label>
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            let data = { email: email, password: password };
            props.onLogin(data);
          }}
        >
          login
        </button>
      </form>
    </div>
  );
}

export default Login;
