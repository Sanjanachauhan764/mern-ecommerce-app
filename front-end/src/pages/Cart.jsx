import axios from "axios";
import { useEffect, useState } from "react";

function Cart(){

    const [cartItems, setCartItems] = useState([]);
    const userEmail = localStorage.getItem("userEmail");

    async function getCart(){
        const res = await axios.get(`https://mern-ecommerce-app-qzaz.onrender.com/cart/${userEmail}`);
        setCartItems(res.data);
    }

    useEffect(() => {
        getCart();
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity),0);

    async function removeItem(id){
    await axios.delete(`https://mern-ecommerce-app-qzaz.onrender.com/remove-cart/${id}`);
    getCart();
    }

    async function placeOrder(item){
    const res = await axios.post(
        "https://mern-ecommerce-app-qzaz.onrender.com/place-order",
        {
            userEmail: localStorage.getItem("userEmail"),
            cartId: item._id
        }
    );
    alert(res.data.message);
    getCart();
    }

    async function increaseQuantity(id){
    await axios.put(
        `https://mern-ecommerce-app-qzaz.onrender.com/increase-quantity/${id}`
    );
    getCart();
    }

    async function decreaseQuantity(id){
    await axios.put(
        `https://mern-ecommerce-app-qzaz.onrender.com/decrease-quantity/${id}`
    );
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
                    {/*<h1>My Cart</h1>*/}

                    {
                        cartItems.map((item) => (
                            <div className="cart-card" key={item._id}>
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                {/*<p>{item.description}</p>*/}
                                <p>₹{item.price} × {item.quantity}</p>
                                <p><strong>Total: ₹{item.price * item.quantity}</strong></p>
                                <div className="quantity-box">
                                    <button
                                        className="qty-btn"
                                        onClick={() => decreaseQuantity(item._id)}
                                    >
                                        −
                                    </button>

                                    <span className="qty-number">
                                        {item.quantity}
                                    </span>

                                    <button
                                        className="qty-btn"
                                        onClick={() => increaseQuantity(item._id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button onClick={() => removeItem(item._id)}>Remove</button>
                                <button onClick={() => placeOrder(item)} className="place-order-btn">Place Order</button>
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