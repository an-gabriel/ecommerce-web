import React, { useState, useEffect } from 'react';
import { Button, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AdicionarEnderecoModal from './components/AdicionarEnderecoModal';
import EnderecoListagem from './components/ListagemEndereco';
import api from '../../client/api';

interface Endereco {
    endereco_id: number;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    numero: string;
    complemento?: string;
    uf: string;
}

const EnderecoForm: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const fetchEnderecos = async () => {
        try {
            const response = await api.get('/enderecos');
            setEnderecos(response.data);
        } catch (error) {
            console.error('Erro ao carregar endereços:', error);
            setError('Erro ao carregar endereços. Tente novamente mais tarde.');
        }
    };

    const adicionarEndereco = async (novoEndereco: Partial<Endereco>) => {
        try {
            const response = await api.post('/enderecos', novoEndereco);
            console.log('Endereço adicionado com sucesso:', response.data);
            await fetchEnderecos();
        } catch (error) {
            console.error('Erro ao adicionar endereço:', error);
            setError('Erro ao adicionar endereço. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchEnderecos();
    }, []);

    const handleSnackbarClose = () => {
        setError(null);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ mb: 2 }}>
                + Adicionar Novo Endereço
            </Button>

            <EnderecoListagem enderecos={enderecos} />

            <AdicionarEnderecoModal
                open={openModal}
                onClose={handleCloseModal}
                onEnderecoAdded={adicionarEndereco}
            />

            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default EnderecoForm;
