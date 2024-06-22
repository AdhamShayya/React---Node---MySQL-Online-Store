import { useState, useEffect, useContext  } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { Box } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Sidebar from "./AdminSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DashBoard = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0); // State to store product count
  const [usersCount, setUsersCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subCategoryCount, setSubCategoryCount] = useState(0);
  const [isSidebar, setIsSidebar] = useState(true);
  const { authState, setAuthState } = useContext(AuthContext)

  useEffect(() => {

      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        // Check if a valid token is stored and update authState
        setAuthState({ ...authState, status: true }); // Update status to logged in
      } else if (!authState.status) {
        navigate("/login");
      }
    

    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products/count"); // Replace with your actual API endpoint
        setProductCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);

      }
      try {
        const response = await axios.get("http://localhost:4000/users/count"); // Replace with your actual API endpoint
        setUsersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);

      }
      try {
        const response = await axios.get("http://localhost:4000/category/catCount"); // Replace with your actual API endpoint
        setCategoryCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);

      }
      try {
        const response = await axios.get("http://localhost:4000/category/subCount"); // Replace with your actual API endpoint
        setSubCategoryCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);

      }
    };

    fetchProductCount();
  }, []);

  return (
    <Box display="flex">
    <Sidebar isSidebar={isSidebar} />
    <div className="admin">
      <Box display="flex" justifyContent="space-between" alignItems="center" color="#F0BD22">
        <Header title="DashBoard" subtitle="Welcome to your dashboard" />
      </Box>
  
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="20px"
        padding="10px"
        color="yellow"
        border="2px solid #333"
        mr="15px"
      >
        {/* STAT BOXES */}
        <Box display="flex" alignItems="center" justifyContent="center" border="2px solid #333" padding="10px">
          <StatBox
            title={productCount}
            subtitle="Number of products"
            progress="0.75"
            icon={<InventoryIcon  sx={{ fontSize: "26px"  }} />}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" border="2px solid #333">
          <StatBox
            title={usersCount}
            subtitle="Number of Users"
            progress="0.50"
            icon={<PointOfSaleIcon sx={{ fontSize: "26px", color: "#F0BD22" }} />}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" border="2px solid #333">
          <StatBox
            title={categoryCount}
            subtitle="Num of Category"
            progress="0.30"
            icon={<PersonAddIcon sx={{ fontSize: "26px", color: "#F0BD22"  }} />}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" border="2px solid #333">
          <StatBox
            title={subCategoryCount}
            subtitle="Number of Sub Category"
            progress="0.80"
            icon={<TrafficIcon sx={{ fontSize: "26px", color: "#F0BD22"  }} />}
          />
        </Box>
  
        {/* Additional boxes can be added similarly */}
  
      </Box>

          <button className="AdminButton" onClick={() => navigate("/")}> Go To Home Page</button>
    </div>
  </Box>
  );
};

export default DashBoard;