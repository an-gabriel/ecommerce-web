import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem, ListItemButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
                                <Button variant="contained" fullWidth startIcon={<LocalShippingIcon />}>
                                    Produto
                                </Button>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Listagem</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItemButton onClick={() => onSelectForm('listagem_categoria')}>
                                <Button variant="contained" fullWidth startIcon={<ListAltIcon />}>
                                    Categoria
                                </Button>
                            </ListItemButton>
                            <ListItemButton onClick={() => onSelectForm('listagem_cliente')}>
                                <Button variant="contained" fullWidth startIcon={<PeopleAltIcon />}>
                                    Cliente
                                </Button>
                            </ListItemButton>
                            <ListItemButton onClick={() => onSelectForm('listagem_pedido')}>
                                <Button variant="contained" fullWidth startIcon={<ShoppingCartIcon />}>
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
