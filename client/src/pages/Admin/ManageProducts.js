import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import Sidebar from "./AdminSideBar";

const Team = () => {
    const [products, setProducts] = useState([])
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

        axios.get('http://localhost:4000/products',{ // getting all the users 
        headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response)=> {
         setProducts(response.data)
        })

}, []);

const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title", flex: 1, renderCell: (params) => {
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
    { field: "price", headerName: "Price", flex: 1 , renderCell: (params) => {
        return (
          <div onClick={() => updatePrice(params.row)}>
            {params.value}
          </div>
        );
      }
    },
    { field: "quantity", headerName: "quantity", renderCell: (params) => {
        return (
          <div onClick={() => updateQuantity(params.row)}>
            {params.value}
          </div>
        );
      }
    },
    { field: "image", headerName: "Image", renderCell: (params) => {
        return (
          <div onClick={() => updateImage(params.row)}>
            {params.value}
          </div>
        );
      }
    },
    { field: "SubCategoryId", headerName: "SubCategoryId", flex: 1 },
    { field: "UserId", headerName: "UserId", flex: 1 },
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
                <Typography sx={{ ml: "5px", cursor: "pointer"}}>
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
      axios.put("http://localhost:4000/product/title", {
        newTitle: newTitle,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedProducts = products.map(product => {
        if (product.id === rowData.id) {
          return { ...product, title: newTitle };
        }
        return product;
      });
    
      setProducts(updatedProducts);
    }
  };

  const updatePrice = (rowData) => {
    // Handle click event for the "Title" column
    let newPrice = prompt("Enter new Price") // like an input in the front end
    if(newPrice !== null && newPrice !== ""){
      axios.put("http://localhost:4000/product/price", {
        newPrice: newPrice,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedProducts = products.map(product => {
        if (product.id === rowData.id) {
          return { ...product, price: newPrice };
        }
        return product;
      });
      
      setProducts(updatedProducts);
    }
  };


  
  const updateQuantity = (rowData) => {

    let newQuantity = prompt("Enter new Quantity") // like an input in the front end
    if(newQuantity !== null && newQuantity !== ""){
      axios.put("http://localhost:4000/product/quantity", {
        newQuantity: newQuantity,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedProducts = products.map(product => {
        if (product.id === rowData.id) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      
      setProducts(updatedProducts);
    }
  };

  
  const updateDesciption = (rowData) => {
    let newDescription = prompt("Enter new Description")
    if(newDescription !== null && newDescription !== ""){
      axios.put("http://localhost:4000/product/description", {
        newDescription: newDescription,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedProducts = products.map(product => {
        if (product.id === rowData.id) {
          return { ...product, description: newDescription };
        }
        return product;
      });
      
      setProducts(updatedProducts);
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
    const updatedProducts = products.map(product => {

        if (product.id === rowData.id) {
          return { ...product, image: newImage };
        }
        return product;
      });
      
      setProducts(updatedProducts);
    }
  };

const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/products/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
        // Filter out the deleted member from the state
        setProducts(products.filter(product => product.id !== id));
    }).catch((error) => {
        console.error("Error deleting member:", error);
    });
};

return (
    <div className="sideBarFlex">
        <Sidebar /> 
   
    <div className="tableBack">
    <Box m="20px">
        <div className="adminHeader">
        <Header title="Products" subtitle="Managing the Store Products" />
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
                "& .MuiButtonBase-root:hover": {
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
                "& .MuiCheckbox-root": {
                    color: "#555 !important",
                },
               
                
               
            }}
        >
            <DataGrid  rows={products} columns={columns} />
        </Box>
    
</Box>
</div>
</div>
);
};

export default Team;