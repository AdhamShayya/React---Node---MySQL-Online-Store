import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Navbar from './Navbar';
import Footer from './Footer';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
function Products() {

    let { id } = useParams();
    const [listOfProducts, setListOfProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const {authState } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
      //                                     for all products                        to display the liked products
      axios.get(!authState.status ? `http://localhost:4000/products/all/${id}` : `http://localhost:4000/products/${id}`, {
        //                                               incase of logged in                  no
          headers: authState.status ? { accessToken: localStorage.getItem("accessToken") } : {}
      }).then((response) => {
          setListOfProducts(response.data.listOfProducts);
          if (authState.status) {
              setLikedProducts(response.data.likedProducts.map((like) => like.ProductId));
          }
      });
        axios.get(`http://localhost:4000/products/prodName/${id}`).then((response) => { // to get all the subCategory name
        setSubCategory(response.data);  
    });
      }, [id, authState.status]);

      const likeAProduct = (productId) => {
        if(!authState.status){
          navigate("/login")
        }else{
    
        axios.post(
          "http://localhost:4000/likes",
          { ProductId: productId }, // passing the data to the backend
          { headers: { accessToken: localStorage.getItem("accessToken")}}, // passing the token
        )
        .then((response) => {
          setListOfProducts(listOfProducts.map((product) => { // to update the likes immediately
              if (product.id === productId){
                if(response.data.liked){ // in case of liking
                  return {...product, Likes: [...product.Likes, 0]} // we are only changing the likes and the then we are rendering throught the list and 0 is displaying any data will be added
                
                }else{ // in case of disliking
                 
                  const likeArray = product.Likes
                  likeArray.pop() // decrease the number
                  return {...product, Likes: likeArray}
                
                }
              }else {
                return product
            }
          }));
        
          if(likedProducts.includes(productId)){
            
            setLikedProducts(likedProducts.filter((id) => {
                return id != productId // to remove the item from the liked list to display the empty heart
            }));
          } else {
            setLikedProducts([...likedProducts, productId])
          }
        });
      }
      }
  return (
    <div className="Productss">
        <div>
        <Navbar />
        <div className="productSpace"></div>
        <h1 className="headerMargin"> {subCategory.title} </h1>

        <div >
            <div className="Products">
            {listOfProducts.map((value, key) => (
              
               <div key={key} className="ProductsCard">

               <div className="imgBox">
                   <img src={value.image}  alt={value.title}  className="mouse"/>
               </div>
   
           <div className="contentBox">
               <h3>{value.title}</h3>
             <div className="priceContainer">
               <h4 className="price">${value.price.toFixed(2)}    </h4>
              
            {likedProducts.includes(value.id) ? ( // if there is no token then these datafields will be displayed
          <>
           <FaHeart className="heart" onClick={() => {
                likeAProduct(value.id)
                } }/>
          </>
          ) : (
            <>
            <CiHeart className="heart" onClick={() => {
              likeAProduct(value.id)
              } }/>
              </>
          )
        }   
        <label className="number"> {value.Likes.length}</label>

           </div>
               <a className="buy"  onClick={() => {
                navigate(`/product/${value.id}`)
                }}>View More
                </a>
           </div>
   
       </div>
  ))}
</div>
        
        </div>
     
    </div>
    <Footer />
    </div>
  )
}

export default Products
