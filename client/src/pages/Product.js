import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Navbar from './Navbar';
import Footer from './Footer';

function Product() {
  let { id } = useParams(); // productId
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Add state for success message
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/product/${id}`).then((response) => {
      setProduct(response.data);
    });
    axios.get(`http://localhost:4000/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios.post("http://localhost:4000/comments", {
      commentBody: newComment,
      ProductId: id,
    }, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
    .then((response) => {
      if (response.data.error) {
        navigate("/login");
      } else {
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username
        };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      }
    });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:4000/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
    .then(() => {
      setComments(comments.filter((val) => {
        return val.id !== id;
      }));
    });
  };

  const addToCart = (productId) => {
    if (!authState.status) {
      navigate("/login");
    } else {
      axios.post("http://localhost:4000/cart", {
        ProductId: productId
      }, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log(response.data);
          setShowSuccessMessage(true); // Show success message
          setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
        }
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="product-page">
        <div className="product-image">           
          <img src={product.image} alt={product.title} className="mouse"/>
        </div>
        <div className="product-details"> 
          <h2>{product.title}</h2>
          <div className="descrip">
            <div className="cartFlex">
              <h3>{product.description}</h3>
              <p>Only For: ${product.price}</p>
            </div>
          </div>
          <button onClick={() => { addToCart(product.id) }}>Add to Cart</button>
          {showSuccessMessage && <div className="success-message">Item added to cart!</div>} {/* Success message */}
        </div>
      </div>
      <div className="comments">
        <h2 className="headerMargin">Comments</h2>
        <div className="addCommentContainer">
          <input 
            type="text"
            placeholder="Submit your feedback" 
            autoComplete="off" 
            value={newComment} 
            onChange={(event) => { setNewComment(event.target.value) }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="comments-container">
          <div className="comments-list">
            {comments.map((comment, key) => (
              <div key={key} className="comment">
                <div className="flexx">
                  <div className="btnMagrin">
                    <div className="Name">
                      <h3>Username:</h3>
                      <p>{comment.username}</p>
                    </div>
                    <div className="commentBody">
                      {comment.commentBody}
                    </div>
                  </div>
                  {authState.username === comment.username && (
                    <button onClick={() => deleteComment(comment.id)}>Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />   
    </div>
  );
}

export default Product;
