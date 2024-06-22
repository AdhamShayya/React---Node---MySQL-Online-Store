import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Navbar from './Navbar';
import Footer from './Footer';
import { BsCartCheckFill } from "react-icons/bs"; //<BsCartCheckFill />


function Cart() {
    let { id } = useParams(); // user id
    const [cartProducts, setCartProducts] = useState([])
    const { authState, setAuthState } = useContext(AuthContext)
    const [totalPrice, setTotalPrice] = useState(0.0)
    const navigate = useNavigate()

    useEffect(() => {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        // Check if a valid token is stored and update authState
        setAuthState({ ...authState, status: true }); // Update status to logged in
      } else if (!authState.status) {
        navigate("/login");
      }
           axios.get(`http://localhost:4000/cart/${id}`, { // getting the cart items using userid
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            
          let totalPrice = 0
           setCartProducts(response.data.cartProducts)
           setTotalPrice(response.data.totalPrice)
          });
    
      }, [id, authState.status]);

      const deleteProductFromCart = (productId, quantity, price) => {
        console.log(productId, quantity)
        if (!authState.status) {
          navigate("/login");
        } else {
          axios.delete(`http://localhost:4000/cart/${productId}`,
           { headers: { accessToken: localStorage.getItem("accessToken") }},
           { quantity: quantity, totalPrice: totalPrice },// Send quantity as data instead of headers
          )
            .then(() => {
              
                setTotalPrice((totalPrice - (price)*(quantity)));
         
              setCartProducts(cartProducts.filter((val) => val.id !== productId));
            });
        }
      };

      const updateCartItemQuantity = async (productId, quantityChange) => {
        
        try {
          const response = await axios.put( // Update request (PUT)
            `http://localhost:4000/cart/${productId}`,
            { quantity: quantityChange, totalPrice: totalPrice }, // Send updated quantity in the request body
            { headers: { accessToken: localStorage.getItem("accessToken") } }
          );
      
          if (response.status === 200) {

            setCartProducts(cartProducts.map((cartItem) =>
              cartItem.id === productId ? { ...cartItem, quantity: cartItem.quantity + quantityChange } : cartItem
            ));
            setTotalPrice(response.data.totalPrice)
          } else {
            console.error("Error updating cart item quantity");
          }
        } catch (error) {
        console.error("Error updating cart item quantity:", error);
        }
    };

    
  const handleCheckout = () => {
    navigate("/invoice", { state: { cartProducts, totalPrice, id } });
  };


  return (
        <div className="Productss">
        <Navbar/>
        <div className="productSpace"></div>
        <div className="container mt-5 p-3 rounded cart" >
    <div className="row no-gutters">
        <div className="col-md-8">
              <div className="cart-details mr-2">
          
                <h6 className="mb-0 headerMargin">Shopping cart</h6>
            {/* <div className="d-flex justify-content-between"><span>You have 4 items in your cart</span>
                  <div className="d-flex flex-row align-items-center"><span className="text-black-50">Sort by:</span>
                        <div className="price ml-2"><span className="mr-1">price</span></div>
                    </div> 
                </div> */}
            {cartProducts.length === 0 ? (
  <p className="subHeaderMargin">Empty Cart :/</p>
) : (
  cartProducts.map((value, key) => (

                  <div key={key} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                    <div className="d-flex flex-row">
                      <img className="rounded cartImage" src={value.image} alt={value.title} width="150"/>
                        <div className="ml-2 cartProduct ">
                          <span className="font-weight-bold d-block cartProductTitle">{value.title}</span>
                          <p className="cartProductDescription">{value.description} </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <span className="d-block cartPrice">${value.price.toFixed(2)}</span>
                      <button className="d-block ml-5 font-weight-bold cartbtn" onClick={() =>{
              { if(value.quantity === 1) {
                deleteProductFromCart(value.id, value.quantity, value.price)
              }else {
                updateCartItemQuantity(value.id, -1)
              }
              }}}>-</button>
                      <span className="d-block ml-5 font-weight-bold cartQuantity">{value.quantity}</span>
                      <button className="d-block ml-5 font-weight-bold cartbtn" onClick={() => updateCartItemQuantity(value.id, 1)}>+</button>
                      <i className=" ml-3  cartIcon" ><BsCartCheckFill onClick={() => {
                deleteProductFromCart(value.id, value.quantity, value.price)
                } }/></i></div>
                </div>
          )))}
          <hr/>
            <div className="d-flex flex-row align-items-center"><button className="ml-2 cartbutton" onClick={() => navigate(`/`)}>Continue Shopping</button></div>
                
    </div>
</div>
        
<div className="col-md-4 align-content-center">
            <div className="payment-info">
                <h1 className="checkOutHeader ">Total Payment</h1>
                <hr className="line"/>
                <div className="d-flex justify-content-between information"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between information"><span>Shipping</span><span>$10.00</span></div>
                <div className="d-flex justify-content-between information"><span>Total(Incl. taxes)</span><span>${(totalPrice + 10.00).toFixed(2)}</span></div>
                <button className="btn btn-block align-items-center btn-block d-flex justify-content-between checkOutButton" onClick={handleCheckout}><span>${(totalPrice + 10.00).toFixed(2)}</span><span>Checkout</span></button>
            </div>
        </div>
    </div>
</div>
    <Footer />
    </div>

  )
}

export default Cart

