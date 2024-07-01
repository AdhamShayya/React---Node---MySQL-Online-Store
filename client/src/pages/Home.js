import React from 'react'
import axios from "axios"; //api request maker
import { useEffect, useState, useContext } from 'react'; // to be syncronized
import { useNavigate } from 'react-router-dom' /*for navigation*/
import "../App.css"
import images from '../images/homeee.jpg';
import aboutus from '../images/about us.jpg';
import Navbar from './Navbar';
import Footer from './Footer';

function Home() {

  const [listOfCategories, setListOfCategories] = useState([])
  const navigate = useNavigate();
  // getting the list of products
  useEffect(() => {

  axios.get("http://localhost:4000/category") // to get all the categories
      .then((response) => {
        setListOfCategories(response.data);
      });
}, []);

  return (
    <div>
      <Navbar/>
                
      <div className='homeBg '>
        <img src={images}/>
        <div className="whiteSpace"></div>
        <div className="circleSection">
                    <div className="circle">
                        <span>Gifts for Him</span>
                    </div>
                    <div className="circle">
                        <span>Gifts for Her</span>
                    </div>
                    </div>
                    <div className="circleSectionn">
                    <div className="circle">
                        <span>Anniversary Gifts</span>
                    </div>
                    <div className="circle">
                        <span>On Sale</span>
                    </div>
                    </div>
                
        </div>
        
      <div className="content">
      <h2  className="headerMargin"> Discover Our Categories </h2>
                {/* White space */}
                {/* Section for categories in card format */}
                <div className="categorySection">
  {listOfCategories.map((value, key) => {
    // Construct a placeholder image URL with Lorem Picsum
    return (
      <div key={key} className="categoryCard" onClick={() => {navigate(`/category/${value.id}`)}}>
         <img src={value.img} alt={value.title} className="categoryImage" />
          <div className="categoryCardContent">
          <h3>{value.title}</h3>
          <p>{value.description}</p>
        </div>
      </div>
    );
  })}
</div>
<div class="aboutUs" id="aboutUs">
  <div class="aboutUsContainer">
    <div class="aboutUsImage">
      <img src={aboutus} alt="About Us Image" />
    </div>
    <div class="aboutUsContent">
      <h2 class="aboutUsTitle">About Hein</h2>
      <p class="aboutUsDescription">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus eget urna varius pellentesque. Mauris rhoncus augue a leo fringilla, vitae fermentum ligula feugiat. Donec auctor magna sed risus eleifend, ac efficitur justo blandit. Integer at justo at ligula tincidunt fermentum. 
      </p>
    </div>
  </div>
</div>
            </div>

            <Footer />
      
    </div>
  );
}

export default Home;