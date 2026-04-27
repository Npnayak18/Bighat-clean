import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const API = import.meta.env.VITE_API;

  const [data, setData] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    delivered: 0,
    todaySales: 0,
    monthSales: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pRes, oRes] = await Promise.all([
        fetch(`${API}/products`),
        fetch(`${API}/orders`),
      ]);

      const pData = await pRes.json();
      const oData = await oRes.json();

      const products = pData.products || [];
      const orders = oData.orders || [];

      const now = new Date();

      let revenue = 0;
      let pending = 0;
      let delivered = 0;
      let todaySales = 0;
      let monthSales = 0;

      orders.forEach((order) => {
        revenue += order.totalAmount;

        if (order.status === "pending") pending++;
        if (order.status === "delivered") delivered++;

        const d = new Date(order.createdAt);

        // today
        if (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        ) {
          todaySales++;
        }

        // month
        if (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        ) {
          monthSales++;
        }
      });

      setData({
        products: products.length,
        orders: orders.length,
        revenue,
        pending,
        delivered,
        todaySales,
        monthSales,
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">

        <div className="card">
          <p>Total Products</p>
          <h3>{loading ? "..." : data.products}</h3>
        </div>

        <div className="card">
          <p>Total Orders</p>
          <h3>{loading ? "..." : data.orders}</h3>
        </div>

        <div className="card">
          <p>Total Revenue</p>
          <h3>₹{loading ? "..." : data.revenue}</h3>
        </div>

        <div className="card">
          <p>Pending Orders</p>
          <h3>{loading ? "..." : data.pending}</h3>
        </div>

        <div className="card">
          <p>Delivered Orders</p>
          <h3>{loading ? "..." : data.delivered}</h3>
        </div>

        <div className="card">
          <p>Sales Today</p>
          <h3>{loading ? "..." : data.todaySales}</h3>
        </div>

        <div className="card">
          <p>Sales This Month</p>
          <h3>{loading ? "..." : data.monthSales}</h3>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;