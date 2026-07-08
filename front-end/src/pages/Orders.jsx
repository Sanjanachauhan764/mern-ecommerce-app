import axios from "axios";
import { useEffect, useState } from "react";

function Orders(){

    const [orders, setOrders] = useState([]);

    async function getOrders(){
        const res = await axios.get(
            `https://mern-ecommerce-app-qzaz.onrender.com/orders/${localStorage.getItem("userEmail")}`
        );

        setOrders(res.data);
    }
    useEffect(() => {
        getOrders();
    }, []);

    return(
        <div style={{padding:"20px"}}>
            <h1>My Orders</h1>
            {
                orders.length === 0 ? (
                    <h2>No Orders Found</h2>
                ) : (
                    orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="order-header">
                                <h3>
                                    Order ID: {order._id.slice(-6)}
                                </h3>
                            <span className="status">
                                {order.status}
                            </span>
                        </div>
                        <p className="order-date">
                            Placed On:
                            {
                                order.orderDate
                                ? new Date(order.orderDate).toLocaleDateString()
                                : "No Date"
                            }
                        </p>
                        {
                            order.products.map((product) => (
                                <div className="order-product" key={product._id}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                    />
                                    <div>
                                        <h4>{product.title}</h4>
                                        <p>₹{product.price} × {product.quantity}</p>
                                        <p>
                                            <strong>
                                                Total: ₹{product.price * product.quantity}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="order-footer">
                            <div>
                                <h3>Total: ₹{order.total}</h3>
                                <p>Payment: {order.paymentMethod}</p>
                            </div>
                            <button className="details-btn">
                                View Details
                            </button>
                        </div>
                    </div>
                    ))
                )
            }

        </div>
    );
}

export default Orders;