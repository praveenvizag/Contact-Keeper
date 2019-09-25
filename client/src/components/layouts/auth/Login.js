import React, { useState, Fragment, useContext, useEffect } from "react";
import AlertContext from "./../../../context/alert/alertContext";
import AuthContext from "./../../../context/auth/authContext";

const Login = props => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { isAuthenticated, error, clearError, login } = authContext;
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Login isAuthenticated",isAuthenticated);
      props.history.push("/");
    }
    if(error === 'Invalid credentilas') {
      setAlert(error,'danger');
      clearError();
    } else if(error) {
      setAlert('Login Failed','danger');

    }
  },[isAuthenticated]);

  const onSubmit = e => {
    e.preventDefault();
    console.log("Sign in");
    if (email === "" || password === "") {
      setAlert("Enter all fileds", "danger");
    } else {
      console.log("Sign in");
      login({ email, password });
    }
  };
  return (
    <Fragment>
      <div className="form-container">
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <form className="form-group" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-group"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-group"
              name="password"
              value={password}
              onChange={onChange}
            ></input>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
