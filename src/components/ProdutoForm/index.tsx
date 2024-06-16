import React, { useState, useEffect } from 'react';
import { Button, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ListagemProduto from './components/ListagemProduto';
import AdicionarProdutoModal from './components/AdicionarProdutoModal';
import api from '../../client/api';

interface Produto {
    produto_id: number;
    nome_produto: string;
    descricao_produto: string;
    preco_produto: number;
    qtd_estoque: number;
    categoria_id: number;
    imagem: string;
    categoria: {
        categoria_id: number,
        descricao_categoria: string
    }
}

const ProdutoForm: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const fetchProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            setError('Erro ao carregar produtos. Tente novamente mais tarde.');
        }
    };

    const adicionarProduto = async (novoProduto: Partial<Produto>) => {
        try {
            const response = await api.post('/produtos', novoProduto);
            console.log('Produto adicionado com sucesso:', response.data);
            await fetchProdutos();
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            setError('Erro ao adicionar produto. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleSnackbarClose = () => {
        setError(null);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ mb: 2 }}>
                + Adicionar Novo Produto
            </Button>

            <ListagemProduto produtos={produtos} />

            <AdicionarProdutoModal
                open={openModal}
                onClose={handleCloseModal}
                onProdutoAdded={adicionarProduto}
            />

            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default ProdutoForm;
