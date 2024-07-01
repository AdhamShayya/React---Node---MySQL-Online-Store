import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Sidebar from "./AdminSideBar";


function AddCategory() {
  const initialValues = {
    title: "",
    description: "",
    image: "",
  };

  let navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim()
      .required("Title is required")
      .max(255, "Title must be at most 255 characters"),

    description: Yup.string().trim()
      .required("Description is required")
      .max(1000, "Description must be at most 1000 characters"),

    image: Yup.string().trim()
      .required("Image URL is required")
      .url("Image URL must be a valid URL"),

  });

  const onSubmit = (data) => {
    axios.post("http://localhost:4000/category", data, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        navigate("/test")
      }
    });
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="loginbackground">
      <Sidebar /> 
      <div className="signupcontainer">
        <div className="form">
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add Product
          </Button>
          <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                   <Form>
                   {/* username */}
                   <h1 className="formheader">Add A Product</h1>
                   <label>Title: </label>
                   <ErrorMessage className="error" name="title" component="span" />
                   <Field
                     autoComplete="off"
                     id="inputCreatePost"
                     name="title"
                     placeholder="Title:"
                     className="forminput"
                   />
                   {/* Description */}
                   <label>Description: </label>
                   <ErrorMessage className="error" name="description" component="span" />
                   <Field
                     autoComplete="off"
                     id="inputCreatePost"
                     name="description"
                     placeholder="Description:"
                     className="forminput"
                   />
                   {/* phone number */}
                   <label>Price: </label>
                   <ErrorMessage className="error" name="price" component="span" />
                   <Field
                     autoComplete="off"
                     name="price"
                     placeholder="Price:"
                     className="forminput"
                   />
                   {/* Password */}  
                   <label>Quantity: </label>
                   <ErrorMessage className="error" name="quantity" component="span" />
                   <Field
                     autoComplete="off"
                     id="inputCreatePost"
                     name="quantity"
                     placeholder="Quantity:"
                     className="forminput"
                   />
         
                   {/* Image */}  
                   <label>Image: </label>
                   <ErrorMessage className="error" name="image" component="span" />
                   <Field
                     autoComplete="off"
                     id="inputCreatePost"
                     name="image"
                     placeholder="URL:"
                     className="forminput"
                   />
         
                   {/* SubCategoryId */}  
                   <label>SubCategoryId: </label>
                   <ErrorMessage className="error" name="SubCategoryId" component="span" />
                   <Field
                     autoComplete="off"
                     id="inputCreatePost"
                     name="SubCategoryId"
                     placeholder="SubCategoryId:"
                     className="forminput"
                   />
         
                     <div className="buttons">
                         <button type="submit"  className="formregister"> Add </button>
                         <button  onClick={() => navigate("/")}className="formregister"> Home </button>
                     </div>
                 </Form>
                )}
              </Formik>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
