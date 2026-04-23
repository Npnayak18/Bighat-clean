const API= import.meta.env.VITE_API;
import {useEffect,useState} from 'react';
import "./Dashboard.css";
function Dashboard() {
    const[data,setData]=useState({
        products:0,
        orders:0,
        revenue:0,
        pending:0,
        delivered:0,
        todaySales:0,
        monthSales:0,
    });
    const[loading,setLoading]=useState(true);
    useEffect(()=>{loadData();
    },[]);
    const loadData = async () => {
    try {
      const [pRes,oRes]=await Promise.all([
        fetch(`${API}/products`),
        fetch(`${API}/orders`),
      ]);

const pData=await pRes.json();
const oData=await oRes.json();
const products = pData.products || [];
const orders = oData.orders || [];
const now = new Date();
let revenue = 0;
let pending = 0;
let delivered = 0;

orders.forEach((order) => {
revenue += order.totalAmount;
if(order.status==="pending") pending++;
if(order.status==="delivered") delivered++;
const d = new Date(order.createdAt);
      });
setData({
products:products.length,
orders:orders.length,
});
 } catch (err) {console.log(err);  } finally {
   setLoading(false);
    }
  };

  return (
    <div>
        <h2>Admin Dashboard</h2>
        <div>
            <div className="card">
        <p>Total products</p>
        <h3>{loading? "...":data.products}</h3>
        </div>
        <div className="card">
        <p>Total orders</p>
        <h3>{loading?"...":data.orders}</h3>
        </div>
        <div className="card">
            <p>Total revenue</p>
        </div>
        <div>
            <p>Pending</p>
        </div>
        </div>
    </div>
  )
}

export default Dashboard