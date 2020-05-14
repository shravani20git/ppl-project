import React, { useState, useEffect } from "react";
import Login from "./Login.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInType, setLogInType] = useState("patient");
  const [uid, setUid] = useState();

  useEffect(() => {
    let url;
    if (logInType === "patient") {
      url = "http://localhost:5000/patient/login-status";
    } else {
      url = "http://localhost:5000/doctors/login-status";
    }
    async function checkLogin() {
      let data;
      await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        credentials: "include", // to send cookies and other things over cross origin requests
      })
        .then((response) => response.json())
        .then((d) => {
          console.log("Success:", data);
          data = d;
        })
        .catch((error) => {
          data = null;
          console.error("Error:", error);
        });
      return data;
    }
    checkLogin().then((data) => {
      if (data) {
        setLoggedIn(data.status);
        setUid(data.user_id);
        setLogInType(data.user_type);
      } else {
        console.log("Error aaya");
      }
    });
  }, []);
  const handleLogin = (data) => {
    let url;
    if (logInType === "patient") {
      url = "http://localhost:5000/patient/login";
    } else {
      url = "http://localhost:5000/doctors/login";
    }
    async function login(data) {
      let res;
      await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: "include", // to send cookies and other things over cross origin requests
        headers: {
          "Content-Type": "application/json",

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((d) => {
          console.log("Success:", data);
          res = d;
        })
        .catch((error) => {
          res = null;
          console.error("Error:", error);
        });
      return res;
    }
    login(data).then((data) => {
      if (data) {
        setLoggedIn(data.status);
        setUid(data.user_id);
        setLogInType(data.user_type);
      }
    });
  };
  const handleLogout = () => {
    let url;
    if (logInType === "patient") {
      url = "http://localhost:5000/patient/logout";
    } else {
      url = "http://localhost:5000/doctors/logout";
    }
    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // to send cookies and other things over cross origin requests
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setLoggedIn(!data.status);
        setUid(undefined);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const loginTypeChange = (type) => {
    console.log(type);
    setLogInType(type);
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          MindTrainer.com
        </a>
        {loggedIn ? (
          <button className="btn btn-primary" onClick={handleLogout}>
            logout
          </button>
        ) : null}
      </nav>
      <div className="container container-fluid">
        <Router>
          <Switch>
            <Route exact path="/">
              {!loggedIn ? <Redirect push to="/login" /> : null}
            </Route>
            <Route exact path="/login">
              {!loggedIn ? (
                <Login
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onLoginTypeChange={loginTypeChange}
                />
              ) : null}
            </Route>
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
