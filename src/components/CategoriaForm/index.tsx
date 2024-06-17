import React, { useState, useEffect } from 'react';
import { Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import ListaCategorias from './components/ListaCategorias';
import AdicionarCategoriaModal from './components/AdicionarCategoriaModal';
import api from '../../client/api';
import { AxiosError } from 'axios';
import AddIcon from '@mui/icons-material/Add';

interface Categoria {
    categoria_id: number;
    nome_categoria: string;
    descricao_categoria: string;
}

const CategoriaForm: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            const categoriasCarregadas: Categoria[] = response.data;
            setCategorias(categoriasCarregadas);

            const paginaAtual = Math.ceil(categoriasCarregadas.length / 10);
            setCurrentPage(paginaAtual);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarCategoria = async (novaCategoria: Categoria) => {
        try {
            await api.post('/categorias', novaCategoria);
            await fetchCategorias();
        } catch (error) {
            const err = JSON.parse((error as AxiosError).request?.response)
            console.error('Erro ao adicionar categoria:', error);
            setSnackbarMessage(err.message || 'Erro ao adicionar categoria');
            setOpenSnackbar(true);
        }
    };

    const handleDeleteCategoria = async (categoriaId: number) => {
        try {
            await api.delete(`/categorias/${categoriaId}`);
            await fetchCategorias();
        } catch (error) {
            const err = JSON.parse((error as AxiosError).request?.response)

            console.error(`Erro ao excluir categoria ${categoriaId}:`, error);
            setSnackbarMessage(err.message || `Erro ao excluir categoria ${categoriaId}`);
            setOpenSnackbar(true);
        }
    };

    const handleEditCategoria = async (categoriaId: number, novoConteudo: Categoria) => {
        try {
            await api.put(`/categorias/${categoriaId}`, novoConteudo);
            await fetchCategorias();
        } catch (error) {
            const err = JSON.parse((error as AxiosError).request?.response)
            console.error(`Erro ao editar categoria ${categoriaId}:`, error);

            setSnackbarMessage(err.message || `Erro ao editar categoria ${categoriaId}`);
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ mb: 2 }}>
                <AddIcon /> Nova Categoria
            </Button>

            <ListaCategorias
                categorias={categorias}
                currentPage={currentPage}
                onDeleteCategoria={handleDeleteCategoria}
                onEditCategoria={handleEditCategoria}
            />

            <AdicionarCategoriaModal
                open={openModal}
                onClose={handleCloseModal}
                onCategoriaAdded={adicionarCategoria}
            />

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CategoriaForm;
