import "./Cart.css";
import { useEffect, useState } from "react";
function CartPage() {
    const [cartItems,setCartItems]=useState([]);
useEffect(()=>{
const cart=JSON.parse(localStorage.getItem("cart")) || [];
setCartItems(cart);
  },[]);

const total=cartItems.reduce(
(acc,item)=>acc+item.price*item.qty,0 );


const handleRemove=(id)=>{
  const updated=cartItems.filter(item=>item._id!==id);
  setCartItems(updated);
  localStorage.setItem("cart",JSON.stringify(updated));
  };


const handleBuy=async()=>{
try {
const res=await fetch("http://localhost:3001/create-checkout-session", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
items:cartItems,
      }),
    });
const data=await res.json();
window.location.href=data.url;
  } catch (err) {
    alert("Error");
  }
};

return(
<div className="cart-page">
<h2>Cart</h2>
{cartItems.length === 0 ? (
<p className="empty">Cart is empty</p>
  ) : (
cartItems.map(item=>(
<div key={item._id} className="cart-item">
<img src={`http://localhost:3001/uploads/${item.image}`} />

<div className="cart-details">
<p>{item.name}</p>
<p>₹{item.price}</p>
<p>Qty: {item.qty}</p>
</div>

<button onClick={()=>handleRemove(item._id)}>Remove</button>
 </div>
    ))
  )}

  <div className="cart-total">
    <h3>Total: ₹{total}</h3>
     </div>
<button className="buy-btn"  onClick={handleBuy}>Buy Now</button>
</div>
  );
}


export default CartPage;