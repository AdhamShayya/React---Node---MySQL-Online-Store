import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get('query');
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm) {
        setLoading(false);
        setError('No search term provided');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/search?query=${searchTerm}`);
        setProducts(response.data);
      } catch (err) {
        setError('An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  if (loading) {
    return <div className="content">Loading...</div>;
  }

  if (error) {
    return <div className="content">{error}</div>;
  }

  return (
    <div className="searchContent">
      <Navbar/>
      <h1 className='headerMargin '>Search Results</h1>
      <div className="SearchSection">
        {products.length > 0 ? (
          products.map((product) => (
            <div  onClick={() => {navigate(`/product/${product.id}`)}}>
            <figure>
            <img src={product.image} alt={product.title} />
            
            <figcaption>{product.title}</figcaption>
            </figure>
          </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResults;
