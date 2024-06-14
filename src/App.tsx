import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './theme';
import Header from './components/Header';
import Menu from './components/Menu';
import CategoriaForm from './components/CategoriaForm';
// import ClienteForm from './components/ClienteForm';


const App: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('cadastro_categoria');

  const handleSelectForm = (form: string) => {
    setSelectedForm(form);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'cadastro_categoria':
        return <CategoriaForm />;
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
      <Box sx={{ display: 'flex' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          onSelectForm={handleSelectForm}
        />
        <Box sx={{ flexGrow: 1, p: 3, marginLeft: { sm: '340px' } }}>
          {renderForm()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
