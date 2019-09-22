import React, { useState, Fragment, useContext, useEffect } from "react";
import AlertContext from "./../../../context/alert/alertContext";
import AuthContext from "./../../../context/auth/authContext";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const [err,setErr] = useState('');
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, isAuthenticated,error,clearError } = authContext;
  useEffect(() => {
    if(isAuthenticated) {
      props.history.push('/');
    }
    if (error !== null) {
      setAlert(error, "danger");
      clearError();
    } else if(error === null && isAuthenticated ) {
      console.log('isAuthenticated',isAuthenticated);
      setAlert("Registration Success", "primary");
    }
    //eslint-disable-next-line
  }, [isAuthenticated,error,props.history]);

  const { name, email, password, password2 } = user;
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("Please enter all Fileds", "danger");
    } else if (password !== password2) {
      setAlert("Passwords Do not Match", "danger");
    } else {
      console.log("Submit users", user);
      register({ name, email, password });
    }
  };
  const onBlur = () =>{
    if(password !== password2 ) {
      setErr('Password Doent Match');
      setTimeout( () =>{
        setErr('')
      },5000);
    }
  }
  return (
    <Fragment>
      <div className="form-container">
        <h1 style={{ textAlign: "center" }}>
          {" "}
          Account <span className="text-primary"> Register</span>
        </h1>
        <form className="form-group" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-group"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              className="form-group"
              name="password2"
              value={password2}
              onChange={onChange}
              onBlur = {onBlur}
            ></input>
            {err !== '' && <p style = {{color:'red'}}>{err}</p>}
          </div>
          <input
            type="submit"
            value="Register"
            disabled = { err !== '' ? true : false}
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
