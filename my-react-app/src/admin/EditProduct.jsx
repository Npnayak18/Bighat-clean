 const API= import.meta.env.VITE_API;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";

function EditProduct() {
  const {id}=useParams();
  const navigate=useNavigate();

  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [quantity,setQuantity]=useState("");
  const [category,setCategory]=useState(null);
  const [description,setDescription]=useState("");
  const [image,setImage]=useState(null);
  const [oldImage,setOldImage]=useState("");

  useEffect(()=>{
    fetchProduct();
  },[id]);

  const fetchProduct=async () => {
    const res=await fetch(`${API}/products/${id}`);
    const data=await res.json();
    const p=data.product;
    setName(p.name);
    setPrice(p.price);
    setQuantity(p.quantity);
    setCategory(p.category);
    setDescription(p.description);
    setOldImage(p.image); 
  };

  const handleUpdate=async () => {
    const formData=new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); 
    }
    await fetch(`${API}/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    alert("Product Updated");
    navigate("/admin/view");
  };

  return (
    <div className="admin-container">
      <div className="admin-card">

        <h2>Edit Product</h2>
        {oldImage && (
 <img
     src={`${API}/uploads/${oldImage}`}
       alt="product"
            style={{ width:"80px",marginBottom:"10px" }}
          />
        )}
    <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />
   <input
     type="text"
       value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
<input
     type="number"
    value={price}
          onChange={(e) => setPrice(e.target.value)}
       placeholder="Price"
        />
 <input
     type="text"
     value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
       placeholder="Quantity"
        />
        
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
 <input
type="text"
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Description"
        />

  <button onClick={handleUpdate}> Update Product</button>

      </div>
    </div>
  );
}

export default EditProduct;