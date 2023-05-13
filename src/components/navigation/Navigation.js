import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
    return (
        <nav className="header__nav">
            <ul className="nav">
                <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
                <li className="nav__item"><Link to="/add" className="nav__link">Add Bike</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
