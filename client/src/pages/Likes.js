import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Navbar from './Navbar';
import Footer from './Footer';
import { FaHeart } from 'react-icons/fa';
import { IoIosInformationCircle } from "react-icons/io";

function Likes() {

    let { id } = useParams(); // the userId 
    const [likedProducts, setLikedProducts] = useState([])
    const { authState, setAuthState } = useContext(AuthContext) // Assuming AuthContext provides setAuthState
  
    const navigate = useNavigate()

    useEffect(() => {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        // Check if a valid token is stored and update authState
        setAuthState({ ...authState, status: true }); // Update status to logged in
      } else if (!authState.status) {
        navigate("/login");
      }
            axios.get(`http://localhost:4000/products/fav/${id}`, { // to display all the fav items
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
           setLikedProducts(response.data.likedProducts)
          });
        
    }, [authState.status, id, navigate]);

    const likeAProduct = (productId) => {
      if(!authState.status){
        navigate("/login")
    }else{
    
      axios.delete(`http://localhost:4000/likes/${productId}`,
        { headers: { accessToken: localStorage.getItem("accessToken")}},
          ).then(() => {
            setLikedProducts(likedProducts.filter((val) => {
              return val.id != productId // to delete the comment
            }))
          });
      
    }
    }
  return (
    <div className="Productss">
    <Navbar />
    
    <div className="productSpace"></div>
    <h1 className="headerMargin"> Favorite List </h1>
    <div className="favoriteAll">
    {likedProducts.map((value, key) => (


<div className="wrapper" key={key}>
<div className="container">
<div className="top">
<img src={value.image}  alt={value.title} />
</div>
<div className="bottom">
  <div className="left">
    <div className="details">
    <h4>{value.title}</h4>
      <p>${value.price.toFixed(2)} </p>
    </div>
    <div className="buy">
        <i><FaHeart onClick={() => {
           likeAProduct(value.id)
          } }/></i>
    <i className="number"> {value.Likes.length}</i>
    </div>
  </div>

</div>
</div>
<div className="inside">
<div className="icon"><i className="material-icons"><IoIosInformationCircle /></i></div>
<div className="contents">
  <table>
    <tr>
      <th>Description</th>
    </tr>
    <tr>
      <td>{value.description}</td>
    </tr>
    <tr>
      <td><button onClick ={() => navigate(`/product/${value.id}`)}>View More</button></td>
    </tr>
  </table>
</div>
</div>
</div>
))}
</div>
   <Footer />  
</div>
);
}

export default Likes
