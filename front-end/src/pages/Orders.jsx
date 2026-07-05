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
                        <div
                            key={order._id}
                            style={{
                                background:"white",
                                padding:"20px",
                                marginBottom:"20px",
                                borderRadius:"10px",
                                boxShadow:"0 0 10px rgba(0,0,0,0.2)"
                            }}
                        >
                            <h3>Total: ₹{order.total}</h3>

                            {
                                order.products.map((product) => (
                                    <div key={product._id}>
                                        <p>{product.title}</p>
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