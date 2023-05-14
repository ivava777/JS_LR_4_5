import React, { useContext } from 'react';
import {useNavigate} from "react-router-dom";
import api from "../../api/api";
import { CartContext } from '../../cart-context/CartContext';
import "../../App.css";
import './Cart.css';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddItem = (item) => {
        addToCart(item);
    };

    const handleRemoveItem = (item) => {
        removeFromCart(item);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const calculateTotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCreateOrder = () => {
        // Prepare the order data
        const orderData = {
            orderDetails: cartItems.map((item) => ({
                itemId: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: calculateTotal(cartItems),
        };

        // Send the API request to create the order
        api.post('/orders', orderData)
            .then((response) => {
                console.log('Order created:', response);
                // Optionally, perform any additional actions after the order is created

                // Clear the cart after the order is successfully created
                clearCart();

                navigate(`/orders/${response.data.id}`);

            })
            .catch((error) => {
                console.error('Error creating order:', error);
                // Optionally, handle the error condition
            });
    };

    return (
        <div className="cart-container">
            {cartItems.length === 0 ? (
                <p className="cart-empty-message">Your cart is empty.</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>
                                    <button onClick={() => handleAddItem(item)}  className="main-btn">+</button>
                                    <button onClick={() => handleRemoveItem(item)}  className="sec-btn">-</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <hr/>
                    <div className="cart-total">
                        <p className="cart-total-label">Total:</p>
                        <p className="cart-total-amount">${calculateTotal(cartItems)}</p>
                    </div>
                    <button className="cart-order-button" onClick={handleClearCart} className="sec-btn">
                        Clear Cart
                    </button>
                    <button className="cart-order-button main-btn" onClick={handleCreateOrder}>Create Order</button>
                </>
            )}
        </div>
    );
};

export default Cart;
