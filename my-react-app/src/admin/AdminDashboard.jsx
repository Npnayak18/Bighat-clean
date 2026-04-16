import { useNavigate } from "react-router-dom";
import "./Admin.css";
function AdminDashboard() {
  const navigate=useNavigate();
  return (
    <div className="admin-container">
   <div className="admin-card">
<h2>Admin Dashboard</h2>
<div className="admin-options">
<button onClick={() => navigate("/admin/add")}> Add Product    </button>
<button onClick={() => navigate("/admin/view")}>View Product</button>
<button onClick={() => navigate("/admin/orders")}>Manage Orders</button>
</div>
</div>
  </div>
  );
}
export default AdminDashboard;