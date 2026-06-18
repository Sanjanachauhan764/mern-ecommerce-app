import axios from "axios";
import { useEffect, useState } from "react";

function Cart(){

    const [cartItems, setCartItems] = useState([]);

    async function getCart(){
        const res = await axios.get("http://localhost:5000/cart/sanjana@gmail.com");
        setCartItems(res.data);
    }

    useEffect(() => {
        getCart();
    }, []);

    const total = cartItems.reduce((sum,item) => sum + item.price,0);

    async function removeItem(id){
    await axios.delete(`http://localhost:5000/remove-cart/${id}`);
    getCart();
    }

    
    return(
    <>
        {
            cartItems.length === 0 ? (

                <div className="no-product">
                    <h2>🛒 Your Cart is Empty</h2>
                    <p>Add some products to your cart.</p>
                </div>

            ) : (

                <div className="cart-container">
                    <h1>My Cart</h1>

                    {
                        cartItems.map((item) => (
                            <div className="cart-card" key={item._id}>
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>₹{item.price}</p>
                                <button onClick={() => removeItem(item._id)}>
                                    Remove
                                </button>
                            </div>
                        ))
                    }

                    <h2 className="total-price">
                        Total: ₹{total}
                    </h2>
                </div>

            )
        }
    </>
);
}

export default Cart;