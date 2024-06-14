import React from 'react';
import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CategoriaForm: React.FC = () => {
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [descricaoCategoria, setDescricaoCategoria] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({ nomeCategoria, descricaoCategoria });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Nova Categoria
            </Typography>
            <TextField
                label="Nome da Categoria"
                value={nomeCategoria}
                onChange={(e) => setNomeCategoria(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 20 }}
            />
            <TextField
                label="Descrição da Categoria"
                value={descricaoCategoria}
                onChange={(e) => setDescricaoCategoria(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 200 }}
                multiline
                rows={4}
                maxRows={8}
            />
            <Button type="submit" variant="contained" color="primary">
                Salvar
            </Button>
        </Box>
    );
};

export default CategoriaForm;
