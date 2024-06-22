import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { AuthContext } from "./helpers/AuthContext.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home.js";
import CreatePost from "./pages/CreatePost";
import Product from "./pages/Product.js"
import PageNotFound from "./pages/PageNotFound.js"
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile.js"
import SubCategory from "./pages/SubCategory.js";
import Products from "./pages/Products.js";
import Likes from "./pages/Likes.js";
import Cart from "./pages/Cart.js";
import Members from "./pages/Admin/Members.js"
import ManageProducts from "./pages/Admin/ManageProducts.js"
import ManageCategory from "./pages/Admin/ManageCategory.js"
import SubManageCategory from "./pages/Admin/ManageSubCategory.js"
import DashBoard from "./pages/Admin/DashBoard.js";
import AddCategory from "./pages/Admin/AddCategory.js"
import Invoice from "./pages/Invoice.js";
import Search from "./pages/Search.js";
import "./App.css"
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  
  useEffect(() => { // when we log in it will changes the state and wont bug
    
    axios.get('http://localhost:4000/users/auth', {
       headers: {
          accessToken: localStorage.getItem("accessToken"),
    
        }}).then((response) => {
          if (response.data.error) {
            setAuthState({ ...authState, status: false });
          } else {
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
          }
        });
    }, []);

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }} > {/* since we passed them here then we can change the var in any page */}
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}/> 
          <Route path="/create" exact element={<CreatePost />}/> 
          <Route path="/product/:id" exact element={<Product />}/> 
          <Route path="/registration" exact element={<Registration />}/> 
          <Route path="/login" exact element={<Login />}/> 
          <Route path="/profile/:id" exact element={<Profile />}/>  {/* the :id its a params */}
          <Route path="/category/:id" exact element={<SubCategory />}/>
          <Route path="/products/:id" exact element={<Products />}/>
          <Route path="/fav/:id" exact element={<Likes />}/>
          <Route path="/cart/:id" exact element={<Cart />}/>
          <Route path="/admin" exact element={<DashBoard />}/>
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/search" element={<Search />} />
          
          {/* Admin */}
          <Route path="/membersAdmin" exact element={<Members />}/>
          <Route path="/productsAdmin" exact element={<ManageProducts />}/>
          <Route path="/categoryAdmin" exact element={<ManageCategory />}/>
          <Route path="/subCategoryAdmin" exact element={<SubManageCategory />}/>
          <Route path="/addCategory" exact element={<AddCategory />}/>

          <Route path="*" exact element={<PageNotFound />}/> 
          

        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
