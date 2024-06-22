import { Box, Typography, colors } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import Sidebar from "./AdminSideBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const Team = () => {
    const [category, setCategory] = useState([])
    const { authState, setAuthState } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
          // Check if a valid token is stored and update authState
          setAuthState({ ...authState, status: true }); // Update status to logged in
        } else if (!authState.status) {
          navigate("/login");
        }

        axios.get('http://localhost:4000/category',{ // getting all the users 
        headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response)=> {
         setCategory(response.data)
        })

}, []);

const columns = [
    { field: "id", headerName: "ID" },

    { field: "title", headerName: "Title", flex: 1 , renderCell: (params) => {
        return (
          <div onClick={() => updateTitle(params.row)}>
            {params.value}
          </div>
        );
      }
    },

    { field: "description", headerName: "Description", flex: 1 , renderCell: (params) => {
        return (
          <div onClick={() => updateDesciption(params.row)}>
            {params.value}
          </div>
        );
      }
    },

    { field: "img", headerName: "Image", flex: 1, renderCell: (params) => {
        return (
          <div onClick={() => updateImage(params.row)}>
            {params.value}
          </div>
        );
      }
    },
    { 
        field: "delete",
        headerName: "Delete",
        flex: 1,
        renderCell: ({ row }) => (
            <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                borderRadius="4px"
            >
                <Typography sx={{ ml: "5px" , cursor: "pointer"}}>
                    <FaTrashAlt onClick={() => handleDelete(row.id)} />
                </Typography>
            </Box>
        ),
    }
];


const updateTitle = (rowData) => {
    // Handle click event for the "Title" column
    let newTitle = prompt("Enter new Title") // like an input in the front end
    if(newTitle !== null && newTitle !== ""){
      axios.put("http://localhost:4000/category/title", {
        newTitle: newTitle,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedCategory = category.map(category => {
        if (category.id === rowData.id) {
          return { ...category, title: newTitle };
        }
        return category;
      });
    
      setCategory(updatedCategory);
    }
  };


  const updateDesciption = (rowData) => {
    let newDescription = prompt("Enter new Description")
    if(newDescription !== null && newDescription !== ""){
      axios.put("http://localhost:4000/category/description", {
        newDescription: newDescription,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedCategory = category.map(category => {
        if (category.id === rowData.id) {
          return { ...category, description: newDescription };
        }
        return category;
      });
    
      setCategory(updatedCategory);
    }
  };

  const updateImage = (rowData) => {
    let newImage = prompt("Enter new Image")
    if(newImage !== null && newImage !== ""){
      axios.put("http://localhost:4000/product/image", {
        newImage: newImage,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedCategory = category.map(category => {
        if (category.id === rowData.id) {
          return { ...category, img: newImage };
        }
        return category;
      });
    
      setCategory(updatedCategory);
    }
  };

const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/category/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
        // Filter out the deleted member from the state
        setCategory(category.filter(category => category.id !== id));
    }).catch((error) => {
        console.error("Error deleting member:", error);
    });
};


const initialValues = {
    title: "",
    description: "",
    img: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim()
      .required("Title is required")
      .max(255, "Title must be at most 255 characters"),

    description: Yup.string().trim()
      .required("Description is required")
      .max(1000, "Description must be at most 1000 characters"),

      img: Yup.string().trim()
      .required("Image URL is required")
      .url("Image URL must be a valid URL"),

  });

  const onSubmit = (data) => {
    axios.post("http://localhost:4000/category", data, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        navigate("/admin")
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
    <div className="sideBarFlex">
        <Sidebar /> 
   
    <Box m="20px" className="tableBack">
        <div className="adminHeader">
        <Header title="Categories" subtitle="Managing the Store Categories" />
        </div>
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                    border: "1px solid #F0BD22",
                },
                "& .MuiButtonBase-root": { // buttons
                    border: "1px solid #F0BD22",
                    width: "50px",
                    marginLeft: "10px",
                    marginRight: "10px",
                },
                "& .MuiButtonBase-root:hover": {// buttons
                    border: "1px solid #F0BD22",
                    width: "50px",
                    backgroundColor: "#ffce00",
                    marginLeft: "10px",
                    marginRight: "10px",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #F0BD22",
                },
                "& .name-column--cell": {
                    color: "#333",
                  },
                "& .MuiDataGrid-columnHeader": {
                    borderBottom: "1px solid #F0BD22",
                    backgroundColor: "#F0BD22",
                    color: "#333",
                },
                "& .MuiDataGrid-virtualScroller": {
                    color: "#F0BD22",
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid #F0BD22",
                    backgroundColor: "#F0BD22",
                },
                
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#F0BD22 !important`,
                  },
            }}
        >
            <DataGrid rows={category} columns={columns} />
            <Box display="flex" flexDirection="column" alignItems="center" marginTop="10px">
                <Button  style={{ width: '150px' }} variant="contained" className="categoryButton" onClick={handleOpenModal}>
                    Add Category
                </Button>
            </Box>
        </Box>
    </Box>
          <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                   <Form>
                   {/* title */}
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
                 
               
                   {/* Image */}  
                   <label>Image: </label>
                   <ErrorMessage className="error" name="img" component="span" />
                   <Field
                     autoComplete="off"
                     id="inputCreatePost"
                     name="img"
                     placeholder="URL:"
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
    
);
};

export default Team;