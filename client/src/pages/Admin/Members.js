import { Box, Typography} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import Sidebar from "./AdminSideBar";

const Team = () => {
    const [members, setMembers] = useState([])
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

        axios.get('http://localhost:4000/users/all',{ // getting all the users 
        headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response)=> {
         setMembers(response.data)
        })

}, []);

const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "UserName", flex: 1 , renderCell: (params) => {
        return (
          <div onClick={() => updateUsername(params.row)}>
            {params.value}
          </div>
        );
      }
    },
    { field: "email", headerName: "Email", flex: 1 , renderCell: (params) => {
        return (
          <div onClick={() => updateEmail(params.row)}>
            {params.value}
          </div>
        );
      }
    },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 , renderCell: (params) => {
        return (
          <div onClick={() => updatePhoneNumber(params.row)}>
            {params.value}
          </div>
        );
      }
    },
    {
        field: "admin_type",
        headerName: "Admin Type",
        flex: 1,
        renderCell: (params) => (
          <div onClick={() => updateType(params.row)}>
          {params.value === 0 ? 'User' : 'Admin'}
        </div>
        ),
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
                justifyContent="center"
                borderRadius="4px"
            >
                <Typography sx={{ ml: "5px", cursor: "pointer" }}>
                    <FaTrashAlt onClick={() => handleDelete(row.id)} />
                </Typography>
            </Box>
        ),
    }
];


const updateUsername = (rowData) => {
    // Handle click event for the "Title" column
    let newUserName = prompt("Enter new UserName") // like an input in the front end
    if(newUserName !== null && newUserName !== ""){
      axios.put("http://localhost:4000/users/username", {
        newUserName: newUserName,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedMembers = members.map(member => {
        if (member.id === rowData.id) {
          return { ...member, username: newUserName };
        }
        return member;
      });
    
      setMembers(updatedMembers);
    }
  };


  const updateEmail = (rowData) => {
    let newEmail = prompt("Enter new Email")
    if(newEmail !== null && newEmail !== ""){
      axios.put("http://localhost:4000/users/email", {
        newEmail: newEmail,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedMembers = members.map(member => {
        if (member.id === rowData.id) {
          return { ...member, email: newEmail };
        }
        return member;
      });
    
      setMembers(updatedMembers);
    }
  };

  const updatePhoneNumber = (rowData) => {
    let newPhoneNumber = prompt("Enter new Phone Number")
    if(newPhoneNumber !== null && newPhoneNumber !== ""){
      axios.put("http://localhost:4000/users/phonenumber", {
        newPhoneNumber: newPhoneNumber,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedMembers = members.map(member => {
        if (member.id === rowData.id) {
          return { ...member, phoneNumber: newPhoneNumber };
        }
        return member;
      });
    
      setMembers(updatedMembers);
    }
  };
  const updateType = (rowData) => {
    let newType = prompt("Edit Type")
    if(newType !== null && newType !== ""){
      axios.put("http://localhost:4000/users/type", {
        newType: newType,
         id: rowData.id
        },{  
          headers: {
            accessToken: localStorage.getItem("accessToken") },
      }
    )
    const updatedMembers = members.map(member => {
        if (member.id === rowData.id) {
          return { ...member, admin_type: newType };
        }
        return member;
      });
    
      setMembers(updatedMembers);
    }
  };

const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/users/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
        // Filter out the deleted member from the state
        setMembers(members.filter(member => member.id !== id));
    }).catch((error) => {
        console.error("Error deleting member:", error);
    });
};

return (
    <div className="sideBarFlex">
        <Sidebar /> 
   
    <Box m="20px" className="tableBack">
       <div className="adminHeader">
        <Header title="TEAM" subtitle="Client Management" />
        </div>
        <Box
            m="20px 0 0 0"
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
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#F0BD22 !important`,
                  },
            }}
        >
            <DataGrid rows={members} columns={columns}   />
        </Box>
    </Box>
    </div>

);
};

export default Team;