import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import ProductPage from "./pages/ProductPage";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import ViewProduct from "./admin/ViewProduct";
import EditProduct from "./admin/EditProduct";
import CartPage from "./pages/Cart";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancell";
import Orders from "./admin/Orders";
function App() {
  return (
<Routes>
<Route
path="/"
element={
<>
<Navbar />
<Home />
<Footer />
</>
}
/>
<Route
path="/login"
element={
<>
<Navbar />
<Login />
<Footer />
</>
}
/>
<Route
path="/otp"
element={
<>
<Navbar />
<Otp />
<Footer />
</>
}
/>
<Route
path="/product/:id"
element={
<>
<Navbar />
<ProductPage/>
<Footer />
</>
}
/>

<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/add" element={<AddProduct />} />
<Route path="/admin/view" element={<ViewProduct />} />
<Route path="/admin/edit/:id" element={<EditProduct />} />

<Route path="/cart" element={<CartPage />} />
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-cancel" element={<PaymentCancel />} />
<Route path="/admin/orders" element={<Orders />} />
    </Routes>
  );
}
export default App;