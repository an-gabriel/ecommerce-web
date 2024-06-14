import React from 'react';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { StyledDrawer, FormDescription, FormContainer } from './styles'

interface LoginPanelProps {
    isVisible: boolean;
    onClose: () => void;
}



const LoginPanel: React.FC<LoginPanelProps> = ({ isVisible, onClose }) => {
    return (
        <StyledDrawer
            anchor="right"
            open={isVisible}
            onClose={onClose}
            slotProps={{
                backdrop: { invisible: true },
            }}
        >
            <FormDescription variant="h5" gutterBottom>
                Login
            </FormDescription>
            <FormContainer>
                <TextField label="Username" variant="outlined" />
                <TextField label="Password" type="password" variant="outlined" />
                <Button variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </FormContainer>
        </StyledDrawer>
    );
};

export default LoginPanel;
