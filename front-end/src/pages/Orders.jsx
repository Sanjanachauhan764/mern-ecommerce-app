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
                        <div key={order._id} style={{background:"white",padding:"20px",marginBottom:"20px",borderRadius:"10px",boxShadow:"0 0 10px rgba(0,0,0,0.2)"}}>
                            <h3>Order ID: {order._id}</h3>
                            <p>Date:
                                {
                                    order.orderDate
                                    ? new Date(order.orderDate).toLocaleDateString()
                                    : "No Date"
                                }
                            </p>
                            <p>Status: 
                                <span style={{color:"orange"}}>
                                    {order.status}
                                </span>
                            </p>
                            <p> Payment: {order.paymentMethod} </p>
                            <h3>Total: ₹{order.total}</h3>
                            {
                                order.products.map((product) => (
                                    <div key={product._id}
                                        style={{display:"flex",alignItems:"center",gap:"15px",marginBottom:"15px"}}
                                    >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        width="80"
                                        height="80"
                                        style={{borderRadius:"8px",objectFit:"cover"}}
                                    />
                                    <div>
                                        <h4>{product.title}</h4>
                                        <p>₹{product.price}</p>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    ))
                )
            }

        </div>
    );
}

export default Orders;