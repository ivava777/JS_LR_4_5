import React, {useContext} from 'react';

import './header.css';
import '../../App.css';
import logo from '../../logo.png';
import Navigation from "../navigation/Navigation";
import {CartContext} from "../../cart-context/CartContext";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    };

    return <header className="header">
        <div className="app-content header-content">
            <img src={logo} alt="Bike Lovers logo" className="header__logo"/>
            <div className="header__nav">
                <Navigation />
            </div>
            <button className="cart-button" onClick={handleCartClick}>
                Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
            </button>
        </div>
    </header>;
};

export default Header;
