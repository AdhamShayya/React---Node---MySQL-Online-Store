import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";
import Navbar from './Navbar';
import Footer from './Footer';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartProducts, totalPrice, id } = location.state;

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add company details
    doc.setFontSize(22);
    doc.text("Hein", 20, 20);
    doc.setFontSize(12);
    doc.text("Beirut - Hamra", 20, 30);
    doc.text("Email: company@example.com", 20, 40);
    doc.text("Phone: (123) 456-7890", 20, 45);

    // Add invoice details
    doc.setFontSize(18);
    doc.text("Thank you for ordering the following: ", 20, 60);
    doc.setFontSize(12);
    cartProducts.forEach((product, index) => {
      doc.text(`${product.title} - Qty: ${product.quantity} - $${product.price.toFixed(2)} - Total: $${(product.price * product.quantity).toFixed(2)}`, 20, 70 + index * 10);
    });
    doc.setFontSize(18);
    doc.text("Your total Amount: ", 20, 100);
    doc.setFontSize(12);
    doc.text(`Subtotal: $${totalPrice.toFixed(2)}`, 20, 101 + cartProducts.length * 10);
    doc.text("Shipping: $10.00", 20, 110 + cartProducts.length * 10);
    doc.text(`Overall (Incl. taxes): $${(totalPrice + 10.00).toFixed(2)} / lb: ${(totalPrice + 10.00).toFixed(2) * 90000}`, 20, 120 + cartProducts.length * 10);

    doc.save("invoice.pdf");

    // Reset the cart after generating the PDF
    resetCart();
  };

  const resetCart = () => {
    // Clear cart items from the state
    axios.delete(`http://localhost:4000/cart/reset/${id}`, { // assuming you have an endpoint to reset the cart
      headers: { accessToken: localStorage.getItem("accessToken") }
    }).then(() => {
      navigate("/");
    }).catch(err => {
      console.error("Error resetting the cart:", err);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container p-3 rounded invoice">
        <h1 className="headerMargin">Invoice</h1>
        <hr />
        <div className="invoice-header">
          <h2>HEIN</h2>
          <p>Hamra - Beirut</p>
          <p>Email: HR@hein.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <hr />
        <div className="invoice-details">
          {cartProducts.map((product, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
              <div className="d-flex flex-row">
                <img className="rounded cartImage" src={product.image} alt={product.title} width="100"/>
                <div className="ml-2 cartProduct">
                  <span className="font-weight-bold d-block cartProductTitle">{product.title}</span>
                  <p className="cartProductDescription">{product.description}</p>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center ">
                <span className="d-block cartPricee">${product.price.toFixed(2)}</span>
                <span className="d-block ml-5 font-weight-bold cartQuantityy">Qty: {product.quantity}</span>
                <span className="d-block ml-5 font-weight-bold cartTotalPricee">Total: ${(product.price * product.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div className="d-flex justify-content-between informationn">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between informationn">
          <span>Shipping</span>
          <span>$10.00</span>
        </div>
        <div className="d-flex justify-content-between informationn">
          <span>Total (Incl. taxes)</span>
          <span>${(totalPrice + 10.00).toFixed(2)}</span>
        </div>
        <button className="btn btn-primary mt-3" onClick={generatePDF}>Download PDF</button>
      </div>
      <Footer />
    </div>
  );
};

export default Invoice;
