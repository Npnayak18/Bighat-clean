 const API= import.meta.env.VITE_API;
import {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
function Orders() {
const navigate=useNavigate();
const [orders,setOrders]=useState([]);
useEffect(()=>{fetchOrders();
  },[]);
const fetchOrders=async()=>{
  try{
const res=await fetch(`${API}/orders/all`);
const data=await res.json();
setOrders(data.orders);
}
catch{
alert()

}};





const handleStatusChange=async(id,status)=>{
  try{
await fetch(`${API}/orders/${id}`,{
  method:"PATCH",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({status}),
});
setOrders(orders.map((o)=>o._id===id? {...o,status:status}:o));
  }
  catch{

  }
};

  return (
<div className="mo-container">
<div className="mo-header">
<button onClick={()=>navigate("/admin/dashboard")}>Back</button>
<h2>Manage Orders</h2>
<button onClick={fetchOrders}>Refresh</button>
</div>
{orders.length === 0 ? (
<p>No Orders</p>
):(
<table className="mo-table">
<thead>
<tr>
<th>Order ID</th>
<th>Items</th>
<th>Total</th>
<th>Status</th>
</tr>
</thead>
<tbody>
{orders.map((order) => (
<tr key={order._id}>
<td>{order._id}</td>
<td>
{order.items.map((item,i)=>(
<div key={i}>
{item.name}x{item.qty}
</div>
))}
</td>
<td>₹{order.totalAmount}</td>
<td>
<select value={order.status || "pending"}onChange={(e) =>handleStatusChange(order._id, e.target.value)}>
<option value="pending">Pending</option>
<option value="shipped">Shipped</option>
<option value="delivered">Delivered</option>
</select>
</td>
</tr>
))}
</tbody>
</table>
)}
</div>
  );
}

export default Orders;