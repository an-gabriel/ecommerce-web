import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItemButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WidgetsIcon from '@mui/icons-material/Widgets';
import LocationCity from '@mui/icons-material/LocationCity'


interface MenuProps {
    onSelectForm: (form: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectForm }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '64px',
                left: 0,
                bottom: 0,
                width: '340px',
                backgroundColor: '#f0f0f0',
                overflowY: 'auto',
                borderRight: '1px solid #ccc',
            }}
        >
            <Box sx={{ mt: 2 }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Cadastro</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItemButton onClick={() => onSelectForm('cadastro_categoria')}>
                                <Button variant="contained" fullWidth startIcon={<AddIcon />}>
                                    Categoria
                                </Button>
                            </ListItemButton>
                            <ListItemButton onClick={() => onSelectForm('cadastro_cliente')}>
                                <Button variant="contained" fullWidth startIcon={<PersonAddIcon />}>
                                    Cliente
                                </Button>
                            </ListItemButton>
                            <ListItemButton onClick={() => onSelectForm('cadastro_produto')}>
                                <Button variant="contained" fullWidth startIcon={<WidgetsIcon />}>
                                    Produto
                                </Button>
                            </ListItemButton>
                            <ListItemButton onClick={() => onSelectForm('cadastro_endereco')}>
                                <Button variant="contained" fullWidth startIcon={<LocationCity />}>
                                    Endereco
                                </Button>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Solicitações</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItemButton onClick={() => onSelectForm('cadastro_pedido')}>
                                <Button variant="contained" fullWidth startIcon={<LocalShippingIcon />}>
                                    Pedido
                                </Button>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </div>
    );
};

export default Menu;
