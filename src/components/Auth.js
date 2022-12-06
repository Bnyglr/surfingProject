import React, { useState } from "react";
import axios from 'axios'

function Auth({setIsLogged}) {


  let [authMode, setAuthMode] = useState("signin");
  let [fullName, setFullName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();


  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };


  const onSubmit = async (e) => {
     e.preventDefault();
    if(authMode==="signin"){
      try {
        const response = await axios.post(
          "http://localhost:3001/api/users/login",
          {
            email: email,
            password: password,
          }
          );
          console.log(response.data)
          localStorage.token = response.data.token;
          setIsLogged(response.data.token);
          
        } catch (e) {
          console.log(e);
        }
      }else{
        try{
        const response = await axios.post(
          "http://localhost:3001/api/users/register",
          {
            fullName: fullName,
            email: email,
            password: password,
          }
          );
          console.log(response.data)
          localStorage.token = response.data.token;
          setIsLogged(response.data.token);
        } catch (e) {
          console.log(e);
        }
      }

  };


  
  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={onSubmit}
                type="submit"
                className="btn btn-primary"
                >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={onSubmit}
              type="submit"
              className="btn btn-primary"
              >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Auth;







// console.log('kkkkkkkkkkkkkkkkkkkkkkkkk')
// axios({
//   method: 'post',
//   url: 'http://localhost:3001/api/users/login',
//   data: {
//     email: email,
//     password: password
//   },
//   // headers: {'Authorization': 'Bearer ...'}
// });
