import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import '../images/back.jpg';
import { AuthContext } from "../helpers/AuthContext"; 
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext) // to check if we are logged in or no using the AuthContext in App.js 
  
  let navigate = useNavigate()

  const login = async () => {
    const data = { username: username, password: password };
    await axios.post("http://localhost:4000/users/login", data).then((response) => {
  
    if(response.data.error){
        console.log(response.data.error)// there wont be error in the successfull login
        }else{
        localStorage.setItem("accessToken", response.data.token) // store the data in the session storage

        setAuthState({ 
          username: response.data.username,
          id: response.data.id,
          status: true
          })
          if(response.data.admin_type === 1)
            navigate("/admin")
          else
            navigate("/")
      }
      })
    
  };
  return (
    <div className="loginbackground">
      <div className="signupcontainer form">
          <div>
            <div>
            <h1 className="formheader">Login</h1>
              <label>username:</label>
              <input
                type="text"
                className="forminput"
                placeholder="Name:"
                onChange={(event) => {
                setUsername(event.target.value);
              }}/>
            </div>

            <div>
              <label>Password:</label>
              <input
                type="Password"
                className="forminput"
                placeholder="Password:"
                onChange={(event) => {
                  setPassword(event.target.value);
                }} />
            </div>
              <div className="buttons">
            <button type="submit"  onClick={login}className="formregister"> Login </button>
            <button  onClick={() => navigate("/")}className="formregister"> Home </button>
              </div>
            <div className="formlogin">
              <p>Dont Have an Account? SignUp then.</p>
              <button className="formbutton" onClick={() => {navigate(`/registration`)}}>SignUp</button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Login;