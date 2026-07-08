import axios from "axios";
import { useEffect, useState } from "react";

function Admin(){

    const [products,setProducts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const role = localStorage.getItem("role");
    if(role !== "admin"){
        return <h1>Access Denied</h1>;
    }
    
    async function getProducts(){
        const res = await axios.get("https://mern-ecommerce-app-qzaz.onrender.com/products");
        setProducts(res.data);
    }
    useEffect(() => {
        getProducts();
    }, []);

    async function deleteProduct(id){
        await axios.delete(`https://mern-ecommerce-app-qzaz.onrender.com/delete-product/${id}`);
        getProducts();
    }

    async function updateProduct(){
    await axios.put(
        `https://mern-ecommerce-app-qzaz.onrender.com/update-product/${editId}`,
        {
            title,
            price,
            image,
            description,
            category
        }
    );
    alert("Product Updated");
    setEditId(null);
    getProducts();
    }

    async function addProduct(){
    const res = await axios.post(
        "https://mern-ecommerce-app-qzaz.onrender.com/add-product",
        {
            title,
            price,
            image,
            description,
            category
        }
    );
    alert(res.data.message);
    setTitle("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory("");
    getProducts();
    }

    return(
        <div className="admin-container">
            <div className="admin-form">
            <h1>Admin Panel</h1>
            <h2>Add Product</h2>
            <h3>Total Products: {products.length}</h3>
            <input type="text" placeholder="Product Title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br /><br />
            <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/><br /><br />
            <input type="text" placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)}/><br /><br />
            <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/><br /><br />
            <input type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)}/><br /><br />
            <button onClick={addProduct}>Add Product</button>
            </div>
            {
                editId && (
                    <div className="admin-form">
                        <h2 style={{color:"purple"}}>Edit Product</h2>
                            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/><br /><br />
                            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/><br /><br />
                            <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} placeholder="Image URL"/><br /><br />
                            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"/><br /><br />
                            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category"/><br /><br />
                            <button onClick={updateProduct} style={{backgroundColor:"orange"}}>Update Product</button>
                    </div>
                )
            }
            <div className="admin-products">
            {
                products.map((product) => (
                    <div className="card" key={product._id}>
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>₹{product.price}</p>
                        {/*<p>{product.description}</p>*/}
                        <button onClick={() => { setEditId(product._id); setTitle(product.title); setPrice(product.price); 
                        setImage(product.image); setDescription(product.description);
                        setCategory(product.category);}} style={{backgroundColor:"green"}}>Edit</button>
                        <button onClick={() => deleteProduct(product._id)} style={{marginLeft:"10px", backgroundColor:"red"}}>Delete</button>
                    </div>
                ))
            }
            </div>
        </div>
    );
}
export default Admin;