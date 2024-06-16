import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, IconButton, Grid, Drawer, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './theme';
import Header from './components/Header';
import Menu from './components/Menu';
import CategoriaForm from './components/CategoriaForm';
import ClienteForm from './components/ClienteForm';
import ProdutoForm from './components/ProdutoForm';
import PedidoForm from './components/PedidoForm';
import EnderecoForm from './components/EnderecoForm';

const App: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('cadastro_categoria');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectForm = (form: string) => {
    setSelectedForm(form);
    setIsMobileDrawerOpen(false);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'cadastro_categoria':
        return <CategoriaForm />;
      case 'cadastro_cliente':
        return <ClienteForm />;
      case 'cadastro_produto':
        return <ProdutoForm />;
      case 'cadastro_pedido':
        return <PedidoForm />;
      case 'cadastro_endereco':
        return <EnderecoForm />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Drawer
        variant="temporary"
        anchor="left"
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Menu onSelectForm={handleSelectForm} />
      </Drawer>
      <Grid container>
        <Grid item xs={3} sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsMobileDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Drawer
            variant="permanent"
            anchor="left"
            open
            sx={{ width: '240px', flexShrink: 0 }}
          >
            <Menu onSelectForm={handleSelectForm} />
          </Drawer>
        </Grid>
        <Grid item xs={12} sm={isMobile ? 12 : 9} p={3} sx={{ marginLeft: isMobile ? 0 : '5rem' }}>
          {renderForm()}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
