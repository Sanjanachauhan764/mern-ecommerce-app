import axios from "axios";
import { useEffect, useState } from "react";


function Home({search}){

    const [products, setProducts] = useState([]);
    

    async function getProducts(){
        const res = await axios.get("https://mern-ecommerce-app-qzaz.onrender.com/products");
        setProducts(res.data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function addToCart(product){
    await axios.post(
        "https://mern-ecommerce-app-qzaz.onrender.com/add-to-cart",
        {
            userEmail: "sanjana@gmail.com",
            productId: product._id,
            title: product.title,
            price: product.price,
            description : product.description,
            image: product.image
        }
    );
    alert("Added To Cart");
   }

   const filteredProducts = products.filter((product) =>
   product.title.toLowerCase().includes(search.toLowerCase())
   );

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