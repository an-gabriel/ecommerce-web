import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginPanel from '../LoginPanel';

const Header: React.FC = () => {
    const [showLoginPanel, setShowLoginPanel] = useState(false);

    const toggleLoginPanel = () => {
        setShowLoginPanel(!showLoginPanel);
    };

    const handleCloseLoginPanel = () => {
        setShowLoginPanel(false);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    E-Commerce
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="shopping cart"
                    sx={{ marginRight: 2 }}
                >
                    <i className="fas fa-shopping-cart"></i>
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="account"
                    onClick={toggleLoginPanel}
                >
                    <i className="fas fa-user"></i>
                </IconButton>
            </Toolbar>
            <LoginPanel isVisible={showLoginPanel} onClose={handleCloseLoginPanel} />
        </AppBar>
    );
};

export default Header;
