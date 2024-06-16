import React, { useState, useEffect } from 'react';
import { Button, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AdicionarClienteModal from './components/AdicionarClienteModal';
import ListagemCliente from './components/ListagemCliente';
import api from '../../client/api';

interface Cliente {
    id: number;
    email: string;
    username: string;
    nome: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
}

interface ErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}

const ClienteForm: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const fetchClientes = async () => {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            setError('Erro ao carregar clientes. Tente novamente mais tarde.');
        }
    };

    const adicionarCliente = async (novoCliente: Partial<Cliente>) => {
        try {
            const response = await api.post('/clientes', { ...novoCliente, endereco_id: 1 });
            console.log('Cliente adicionado com sucesso:', response.data);
            await fetchClientes();
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
            setError('Erro ao adicionar cliente. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSnackbarClose = () => {
        setError(null);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ mb: 2 }}>
                + Adicionar Novo Cliente
            </Button>

            <ListagemCliente clientes={clientes} />

            <AdicionarClienteModal
                open={openModal}
                onClose={handleCloseModal}
                onClienteAdded={adicionarCliente}
            />

            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default ClienteForm;
