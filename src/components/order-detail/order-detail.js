import React, { useEffect, useState } from 'react';
import './OrderDetail.css';
import {useParams} from "react-router-dom";
import api from "../../api/api";
import {getDateString} from "../../utils/utils"; // Import the CSS file for styles

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Function to fetch order details by orderId
        const fetchOrderDetails = () => {
            api.get(`/orders/${orderId}`)
                .then(response => {
                    setOrder(response);
                })
                .catch(error => {
                    console.error('Error fetching item:', error);
                });
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!order) {
        return <div className="order-detail-loading">Loading...</div>;
    }

    return (
        <div className="app-content">
            <div className="order-detail">
                <h2>Order Details</h2>
                <ul>
                    <li>
                        <strong>Order ID:</strong> {order.orderId}
                    </li>
                    <li>
                        <strong>Date:</strong> {getDateString(order.date)}
                    </li>
                    <li>
                        <strong>Total Amount:</strong> ${order.totalAmount}
                    </li>
                </ul>
            </div>
            <hr/>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {order.orderDetails.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;
