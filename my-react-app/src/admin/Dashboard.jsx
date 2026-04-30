import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
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

        if (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        ) {
          todaySales++;
        }

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

  const barData = [
    { name: "Products", value: data.products },
    { name: "Orders", value: data.orders },
    { name: "Revenue", value: data.revenue },
    { name: "Today", value: data.todaySales },
    { name: "Month", value: data.monthSales },
  ];

  const pieData = [
    { name: "Pending", value: data.pending },
    { name: "Delivered", value: data.delivered },
  ];

  const COLORS = ["#ff6d00", "#2e7d32"];

  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">

        <div className="card"><p>Products</p><h3>{data.products}</h3></div>
        <div className="card"><p>Orders</p><h3>{data.orders}</h3></div>
        <div className="card"><p>Revenue</p><h3>₹{data.revenue}</h3></div>
        <div className="card"><p>Pending</p><h3>{data.pending}</h3></div>
        <div className="card"><p>Delivered</p><h3>{data.delivered}</h3></div>
        <div className="card"><p>Today</p><h3>{data.todaySales}</h3></div>
        <div className="card"><p>Month</p><h3>{data.monthSales}</h3></div>

      </div>

      <div className="charts">

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2962ff" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100}>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default Dashboard;