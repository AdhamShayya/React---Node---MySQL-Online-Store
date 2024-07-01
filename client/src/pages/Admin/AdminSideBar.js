import React, { useEffect, useState, useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import image from '../../images/back.jpg';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const Item = ({ title, to, icon, selected, setSelected, onClick }) => {

  return (
    <MenuItem active={selected === title}>
      <div onClick={onClick} style={{ cursor: "pointer" }}>
        {icon}
        <Typography>{title}</Typography>
      </div>
      <Link to={to} style={{ display: "none" }} />
    </MenuItem>
  );
};

function AdminSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate()
  const { authState, setAuthState } = useContext(AuthContext)

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      // Check if a valid token is stored and update authState
      setAuthState({ ...authState, status: true }); // Update status to logged in
    } else if (!authState.status) {
      navigate("/login");
    }
    }, []);


/* for the add a product modal */
  
const initialValues = {
    title: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    SubCategoryId: "",
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const onSubmit = (data) => {
    axios.post("http://localhost:4000/products", data, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        navigate("/admin")
      }
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim()
      .required("Title is required")
      .max(255, "Title must be at most 255 characters"),

    description: Yup.string().trim()
      .required("Description is required")
      .max(1000, "Description must be at most 1000 characters"),

    price: Yup.string().trim()
      .required("Price is required")
      .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid number with up to 2 decimal places"),

    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Quantity must be an integer")
      .min(0, "Quantity must be at least 0"),

    image: Yup.string().trim()
      .required("Image URL is required")
      .url("Image URL must be a valid URL"),

    SubCategoryId: Yup.number()
      .required("SubCategoryId is required")
      .integer("SubCategoryId must be an integer")
      .min(0, "SubCategoryId must be at least 0"),
  });

  return (
    <Box marginRight="20px" backgroundColor="#222">
      <Sidebar collapsed={isCollapsed}>
        <Menu >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              marginLeft: "8px",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" >
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={image}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Adham
                </Typography>
                
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              onClick= {() => navigate("/admin")}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <Item
              title="Manage Team"
              onClick= {() => {navigate("/membersAdmin")}}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              display= "flex"
              title="Manage Products"
              onClick={() => {navigate("/productsadmin")}}
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item    
              title="Manage Categories"
              onClick={() => {navigate("/categoryAdmin")}}
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item    
              title="Manage SubCategories"
              onClick={() => {navigate("/subCategoryAdmin")}}
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item    
              title="Add Products"
              onClick={handleOpenModal} 
              icon={<AddBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calender"
              to="/calender"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
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
    </Box>
  );
};

export default AdminSideBar;