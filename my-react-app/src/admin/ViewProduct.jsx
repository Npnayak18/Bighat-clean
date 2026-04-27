
 const API= import.meta.env.VITE_API;
 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function ViewProduct() {
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts=async () => {
    try {
      const res=await fetch(`${API}/products`);
      const data=await res.json();
      setProducts(data.products);
    } catch (err) {
      alert("Error fetching products");
    }
  };
const handleDelete=async(id)=>{
  try{
     await fetch(`${API}/products/${id}`,
    {
      method: "DELETE",
    });
    fetchProducts();

  }catch(err){
    alert("Error");
  }
};


  return (
    <div className="admin-container">
      <div className="view-card">

        <div className="view-header">
          <h2>All Products</h2>
          <button onClick={() => navigate("/admin/add")}>
            Add Product
          </button>
 
        </div>

        {products.length===0 ? (
          <p>No Products Found</p>
        ) : <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                 <th>Price</th>
                 <th>Category</th>
                <th>Quantity</th>
              
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td> <img
                      src={`${API}/uploads/${item.image}`}
                      alt={item.name}
                      style={{width:"40px",height:"40px",objectFit:"cover"}}
                    />
                    </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  
                  <td>{item.description}</td>
                 
  <td>
  <button className="edit-btn" onClick={()=>navigate(`/admin/edit/${item._id}`)}>Edit</button>
  <button className="delete-btn"onClick={()=>handleDelete(item._id)}>Delete</button>
</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        }

      </div>
    </div>
  );
}

export default ViewProduct;