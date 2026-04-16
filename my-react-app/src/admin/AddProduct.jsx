 const API= import.meta.env.VITE_API;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Select from 'react-select';

function AddProduct() {
    const navigate=useNavigate();
  const [name, setName]=useState("");
  const [price, setPrice]=useState("");
  const[category,setCategory]=useState(null);
  const [quantity, setQuantity]=useState("");
  const [description, setDescription]=useState("");
  const [image, setImage]=useState(null);


  const options = [
  { value: 'vegetable seed', label: 'Vegetable & Fruits seed' },
  { value: 'insecticides', label: 'Insecticides' },
  { value: 'farm machinery', label: 'Farm Machinery' },
   { value: 'fungicides', label: 'Fungicides' },
   { value: 'organic farming', label: 'Organic Farming' },
   { value: 'flower seeds', label: 'Flower Seeds' },
   { value: 'nutrients', label: 'Nutrients' },
   { value: 'herbicides', label: 'Herbicides' }
]

  const handleAdd=async () => {
    if (!name || !price) {
      alert("name and price required");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category",category?.value)
    formData.append("quantity",quantity);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        body: formData,
      });
  const data = await res.json();
  if (data.success) {
        alert("Product Added Successfully");
        setName("");
        setPrice("");
        setCategory(null);
        setQuantity("");
        setDescription("");
        setImage(null);
      }
    } catch (err) {
      alert("Error adding product");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Add Product</h2>
    
          
        

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
  <Select
  options={options}
  onChange={(selected)=>setCategory(selected)}
/>
  <input
          type="weight"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={() => navigate("/admin/view")}>  View
          </button>
      </div>
    </div>
  );
}

export default AddProduct;