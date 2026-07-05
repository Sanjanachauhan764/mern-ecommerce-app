import axios from "axios";
import { useEffect, useState } from "react";


function Home({search}){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // async function getProducts(){
    //     const res = await axios.get("https://mern-ecommerce-app-qzaz.onrender.com/products");
    //     setProducts(res.data);
    // }

    async function getProducts() {
    try{
        const res = await axios.get(
            "https://mern-ecommerce-app-qzaz.onrender.com/products"
        );
        setProducts(res.data);
    }
    catch(err){
        console.log(err);
    }
    finally{
        setLoading(false);
    }
    }

    useEffect(() => {
        console.log("Home Mounted");
        getProducts();
    }, []);

    async function addToCart(product){
    const token = localStorage.getItem("token");
    if(!token){
        alert("Please Login First");
        window.location.href = "/login";
        return;
    }
    await axios.post(
        "https://mern-ecommerce-app-qzaz.onrender.com/add-to-cart",
        {
            userEmail: localStorage.getItem("userEmail"),
            productId: product._id,
            title: product.title,
            price: product.price,
            description: product.description,
            image: product.image
        }
    )
    alert(`${product.title} is added to your cart`);
    }

   const filteredProducts = products.filter((product) =>
   product.title.toLowerCase().includes(search.toLowerCase())
   );

    if(loading){
    return(
        <div className="no-product">
            <h2>Loading Products...</h2>
        </div>
    );
    }
    return(
    <div className="product-container">
        <h1>Products</h1>
        {
            filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div className="card" key={product._id}>
                        <img src={product.image} alt={product.title}/>
                        <h2>{product.title}</h2>
                        <p>₹{product.price}</p>
                        <p>{product.description}</p>
                        <button onClick={() => addToCart(product)}>
                            Add To Cart
                        </button>
                    </div>
                ))
            ) : (
                <div className="no-product">
                    <h2>😔 Product Not Available</h2>
                    <p>Try searching for another product.</p>
                </div>
            )
        }
    </div>
);

}
export default Home;