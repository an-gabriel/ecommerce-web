import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, IconButton, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './theme';
import Header from './components/Header';
import Menu from './components/Menu';
import CategoriaForm from './components/CategoriaForm';
import ClienteForm from './components/ClienteForm';
import ProdutoForm from './components/ProdutoForm';
import PedidoForm from './components/PedidoForm';

const App: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('cadastro_categoria');

  const handleSelectForm = (form: string) => {
    setSelectedForm(form);
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
      case 'listagem_categoria':
        return <div>Listagem de Categoria</div>;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid container>
        {/* Menu lateral */}
        <Grid item xs={12} sm={3}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu onSelectForm={handleSelectForm} />
        </Grid>
        {/* Formulário ou conteúdo principal */}
        <Grid item sm={9} p={3}>
          {renderForm()}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
