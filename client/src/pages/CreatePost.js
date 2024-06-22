import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom' /*for navigation*/

function CreatePost() {
    
    const navigate = useNavigate(); 

    const initialValues = {
        title: "",
        description: "",
    }

    const onSubmit = (data) => {

        axios.post("http://localhost:4000/posts", data, {headers: {accessToken: localStorage.getItem('accessToken')},}).then((response) => { 
           navigate("/")
        })
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title"),  /**/
        postText: Yup.string().required(),
    })
  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <label>Title:</label>
                <ErrorMessage name="title" component="span" />
                <Field  
                autoComplete="off"
                id="inputCreatePost" 
                name="title"
                placeholder="title"/> {/* the name should be the same as the database */}
                
                <label>Post:</label>
                <ErrorMessage name="postText" component="span" />
                <Field  
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="postText"
                    placeholder="postText"/> {/* the name should be the same as the database */}
                
                 <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}
export default CreatePost