import React from 'react';
import './style.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>E-Commerce</h1>
            <div className="icons">
                <i className="fas fa-shopping-cart"></i>
                <i className="fas fa-user"></i>
            </div>
        </header>
    );
};

export default Header;
