import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Offers.css";


function Offers() {
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();

   useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts=async () => {
    try {
      const res=await fetch("http://localhost:3001/products");
      const data=await res.json();
      setProducts(data.products);
    } catch (err) {
      alert("Error fetching products");
    }
  };


  return (
    <div className="offers-section">
      <div className="offers-header">
     <div>
    <h3>Today's Offer🔥</h3>
          <p>Best prices available today.</p>
  </div>
  </div>
  <div className="offers-row">
        {products.length===0?(
          <p>No Products</p>
        ):(
          products.map((item) => (
            <div onClick={() => navigate(`/product/${item._id}`)}className="product-card" key={item._id}>
             <img className="img" src={`http://localhost:3001/uploads/${item.image}`}
             />

     <p className="title">{item.name}</p>
       <p className="description">{item.description}</p>
        <p children="price">₹{item.price}</p>
         <p className="quantity">{item.quantity}</p>
        </div>
       ))
        )}
       
      </div>
      </div>
    
  );
}

export default Offers;