import React, { useState, useEffect } from 'react';
import { Button, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ListagemProduto from './components/ListagemProduto';
import AdicionarProdutoModal from './components/AdicionarProdutoModal';
import api from '../../client/api';

interface Categoria {
    categoria_id: number;
    nome_categoria: string;
}

interface Produto {
    produto_id: number;
    nome_produto: string;
    descricao_produto: string;
    preco_produto: number;
    qtd_estoque: number;
    categoria_id: number;
    imagem: string;
    categoria: Categoria
}

const ProdutoForm: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [currentProduto, setCurrentProduto] = useState<Produto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleOpenModal = (produto?: Produto) => {
        if (produto) {
            setCurrentProduto(produto);
        } else {
            setCurrentProduto(null);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setCurrentProduto(null);
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
            if (currentProduto) {
                const response = await api.put(`/produtos/${currentProduto.produto_id}`, novoProduto);
                console.log('Produto atualizado com sucesso:', response.data);
            } else {
                const response = await api.post('/produtos', novoProduto);
                console.log('Produto adicionado com sucesso:', response.data);
            }
            await fetchProdutos();
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao adicionar/atualizar produto:', error);
            setError('Erro ao adicionar/atualizar produto. Tente novamente mais tarde.');
        }
    };

    const handleDeleteProduto = async (produtoId: number) => {
        try {
            await api.delete(`/produtos/${produtoId}`);
            setProdutos(prevProdutos => prevProdutos.filter(produto => produto.produto_id !== produtoId));
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            setError('Erro ao deletar produto. Tente novamente mais tarde.');
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
            <Button onClick={() => handleOpenModal()} variant="contained" color="primary" sx={{ mb: 2 }}>
                + Adicionar Novo Produto
            </Button>

            <ListagemProduto
                produtos={produtos}
                onEditProduto={handleOpenModal}
                onDeleteProduto={handleDeleteProduto}
            />

            <AdicionarProdutoModal
                open={openModal}
                onClose={handleCloseModal}
                onProdutoAdded={adicionarProduto}
                produtoInicial={currentProduto}
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
