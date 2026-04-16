import {useEffect,useRef} from "react";
import {Link} from "react-router-dom";


function PaymentSuccess() {
const hasSaved=useRef(false);
useEffect(()=>{

if(hasSaved.current)return;
hasSaved.current=true;

const saveOrder=async()=>{
const cart=JSON.parse(localStorage.getItem("cart"))||[];
const total=cart.reduce((acc,item)=>acc+item.price*item.qty,0);

try{
    await fetch("http://localhost:3001/orders",{
    method:"POST",
    headers:{"Content-Type": "application/json",
    },
body:JSON.stringify({items:cart,totalAmount:total,email:usee.com}),
    });
localStorage.removeItem("cart");
 } catch(err){console.log(err);
      }};
saveOrder();
},[]);




return(
<div style={{textAlign:"center",padding:"50px"}}>
    <h2>Payment Successful </h2>
    <p>Order saved successfully</p>
  <Link to="/">Home</Link></div>
);
}
export default PaymentSuccess;