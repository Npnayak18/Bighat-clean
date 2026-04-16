import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

function ProductPage() {
const {id}=useParams();
const [product,setProduct]=useState(null);

  useEffect(()=>{
    fetchProduct();
  },[id]);
  const fetchProduct=async()=>{
    try {
const res=await fetch(`http://localhost:3001/products/${id}`);
const data=await res.json();
      setProduct(data.product);
    } catch (err) {
      alert("Error fetching product");
    }
  };

 const handleAddToCart=()=>{
     let cart=JSON.parse(localStorage.getItem("cart"))||[];
  const existing = cart.find(item =>item._id===product._id);
   if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product,qty:1});
  }

   localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};


const handleBuy=async()=> {
  try {
    const singleProduct=[{ ...product,qty:1}];
    localStorage.setItem("cart",JSON.stringify(singleProduct));
    localStorage.removeItem("orderSaved");
    const res=await fetch("http://localhost:3001/create-checkout-session", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        items:singleProduct,
      }),
    });
  const data=await res.json();
  window.location.href=data.url;
  } catch (err) {
    alert("Error");
  }
};

  return (
    <div className="product-container">
      {!product ? (
        <p>No Products</p>
      ) : (
<div className="product-wrapper">
<div className="left">
            <img
              src={`http://localhost:3001/uploads/${product.image}`}
              alt={product.name}
            />
</div>
<div className="right">
<h2 className="title">{product.name}</h2>
<p className="price">₹{product.price}</p>
<p><b>Category:</b> {product.category}</p>
<p><b>Quantity:</b> {product.quantity}</p>
<p className="desc">{product.description}</p>
<div className="buttons">
<button  className="cart-btn" onClick={handleAddToCart} >Add to Cart</button>
<button className="buy-btn" onClick={handleBuy} >Buy Now</button>
</div>
</div>
</div>
)}
</div>
  );
}
export default ProductPage;