import { useEffect, useState } from 'react';
import api from "../../api/api";

import './orders.css';
import {useNavigate} from "react-router-dom";
import {getDateString} from "../../utils/utils";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch orders from the API
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        // Send a GET request to fetch the orders
        api.get('/orders')
            .then((response) => {
                setOrders(response);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    };

    const handleDelete = (orderId) => {
        // Send a DELETE request to delete the order
        api.delete(`/orders/${orderId}`)
            .then((response) => {
                console.log('Order deleted:', response);
                // Remove the deleted order from the orders list
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
            })
            .catch((error) => {
                console.error('Error deleting order:', error);
            });
    };

    const handleOrderDetails = (orderId) => {
        navigate(`${orderId}`);
    };

    return (
        <div className="orders-container">
            <h2>Orders</h2>
            {orders?.length > 0 ? (
                <table className="orders-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{getDateString(order.date)}</td>
                            <td>{order.totalAmount}</td>
                            <td>
                                <button onClick={() => handleOrderDetails(order.id)}>Details</button>
                                <button onClick={() => handleDelete(order.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default Orders;
