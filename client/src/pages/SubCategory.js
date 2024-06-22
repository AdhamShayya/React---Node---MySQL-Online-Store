import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import Footer from './Footer';
function SubCategory() {

    let { id } = useParams();
    const [subCategory, setSubCategory] = useState([]);
    const [subCategoryProducts, setSubCategoryProducts] = useState([]);
    const [category, setCategory] = useState({})

    const navigate = useNavigate()
    
    useEffect(() => {

        axios.get(`http://localhost:4000/category/sub/${id}`).then((response) => { // to get all the subCategories
            setSubCategory(response.data);  
        });
        axios.get(`http://localhost:4000/category/catname/${id}`).then((response) => { // to get the name of the category for the title
            setCategory(response.data);  
        });
        axios.get(`http://localhost:4000/category/all/${id}`).then((response) => { // to get all the subCategories
            setSubCategoryProducts(response.data);  
    });
      }, []);


  return (
    <div className="subCategory">
      <Navbar />
      <div className="productSpace"></div>
<div>
  <div>
    <h1 className="headerMargin">{category.title}</h1>
    <div className="subCategoryContainer">
      {subCategory.map((value, key) => (
        <div key={key} onClick={() => {navigate(`/products/${value.id}`)}}>
          <figure>
          <img src={value.img} alt={value.title} />
          
          <figcaption>{value.title}</figcaption>
          </figure>
        </div>
      ))}
    </div>
         <h2  className="headerMargin"> Glimpse of some {category.title}</h2>
         <div className="subCategoryContainer">
         {subCategoryProducts.map((value, key) => (
        <div key={key} onClick={() => {navigate(`/product/${value.id}`)}}>
          <figure>
          <img src={value.image} alt={value.title} />
          
          <figcaption>{value.title}</figcaption>
          </figure>
        </div>
      ))}
      </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SubCategory
