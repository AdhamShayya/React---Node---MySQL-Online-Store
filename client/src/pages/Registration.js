import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext"; 
import { useNavigate, Link } from 'react-router-dom'

function Registration() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  let navigate = useNavigate()
  const { setAuthState } = useContext(AuthContext) // to check if we are logged in or no using the AuthContext in App.js 
  
  const validationSchema = Yup.object().shape({
    username: Yup.string()
                 .min(3, 'Username must be at least 3 characters')
                 .max(20, 'Username must not exceed 20 characters')
                 .matches(/^[a-zA-Z]+$/, 'Username must only contain letters')
                 .required('Username is required'),

    email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),

    password: Yup.string()
                 .min(8, 'Password must be at least 8 characters')
                 .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
                 .matches(/[0-9]/, 'Password must contain at least one number')
                 .required('Password is required'),

    phoneNumber: Yup.string()
                    .matches( /^[0-9]{8}$/,'Phone number must be exactly 8 digits')
                    .required(),
  });

  const onSubmit = (data) => {
    console.log(data)
    axios.post("http://localhost:4000/users", data).then((response) => {
      if(response.data.error){
        console.log(response.data.error)// there wont be error in the successfull login
        }else{
          console.log(response.data.token)
      localStorage.setItem("accessToken", response.data.token) // store the data in the session storage

      setAuthState({
        username: response.data.username,
        id: response.data.id,
        status: true
        })
      navigate("/")
        }
    });
  };

  return (
    <div className="loginbackground">
    <div className="signupcontainer">
      <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          {/* username */}
          <h1 className="formheader">Signup</h1>
          <label>Username: </label>
          <ErrorMessage className="error" name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Name:"
            className="forminput"
          />
          {/* email */}
          <label>Email: </label>
          <ErrorMessage className="error" name="email" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="email"
            placeholder="Email:"
            className="forminput"
          />
          {/* phone number */}
          <label>Phone Number: </label>
          <ErrorMessage className="error" name="phoneNumber" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="phoneNumber"
            placeholder="PhoneNumber:"
            className="forminput"
          />
          {/* Password */}  
          <label>Password: </label>
          <ErrorMessage className="error" name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
            className="forminput"
          />

<div className="buttons">
            <button type="submit"  className="formregister"> Register </button>
            <button  onClick={() => navigate("/")} className="formregister"> Home </button>
              </div>
        </Form>
      </Formik>
      <div className="formlogin">
            <p >Already Have an Account? Login then.</p>
            <button className="formbutton" onClick={() => {navigate(`/login`)}}>Login</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Registration;