import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
    return (
        <nav className="header__nav">
            <ul className="nav">
                <li className="nav__item"><Link to="/" className="nav__link">Bikes</Link></li>
                <li className="nav__item"><Link to="/orders" className="nav__link">Orders</Link></li>
                <li className="nav__item"><Link to="/items/new" className="nav__link">Add Bike</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
