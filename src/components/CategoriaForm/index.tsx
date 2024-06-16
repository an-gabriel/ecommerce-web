import React, { useState, useEffect } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import ListaCategorias from './components/ListaCategorias';
import AdicionarCategoriaModal from './components/AdicionarCategoriaModal';
import api from '../../client/api';

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

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            const categoriasCarregadas: Categoria[] = response.data;
            setCategorias(categoriasCarregadas);
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

            const paginaAtual = Math.ceil(categorias.length / 10);
            setCurrentPage(paginaAtual);
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
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
                + Adicionar Nova Categoria
            </Button>

            <ListaCategorias categorias={categorias} currentPage={currentPage} />

            <AdicionarCategoriaModal
                open={openModal}
                onClose={handleCloseModal}
                onCategoriaAdded={adicionarCategoria}
            />
        </Box>
    );
};

export default CategoriaForm;
