import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ProdutoForm: React.FC = () => {
    const [nomeProduto, setNomeProduto] = useState('');
    const [descricaoProduto, setDescricaoProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState('');
    const [qtdEstoque, setQtdEstoque] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [imagem, setImagem] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({ nomeProduto, descricaoProduto, precoProduto, qtdEstoque, categoriaId, imagem });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Novo Produto
            </Typography>
            <TextField
                label="Nome do Produto"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Descrição do Produto"
                value={descricaoProduto}
                onChange={(e) => setDescricaoProduto(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                label="Preço do Produto"
                value={precoProduto}
                onChange={(e) => setPrecoProduto(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Quantidade em Estoque"
                value={qtdEstoque}
                onChange={(e) => setQtdEstoque(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="ID da Categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="URL da Imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Salvar
            </Button>
        </Box>
    );
};

export default ProdutoForm;
