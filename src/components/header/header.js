import React from 'react';

import './header.css';
import '../../App.css';
import logo from '../../logo.png';
import Navigation from "../navigation/Navigation";

const Header = () => {
    return <header className="header">
        <div className="app-content header-content">
            <img src={logo} alt="Bike Lovers logo" className="header__logo"/>
            <div className="header__nav">
                <Navigation />
            </div>
        </div>
    </header>;
};

export default Header;
