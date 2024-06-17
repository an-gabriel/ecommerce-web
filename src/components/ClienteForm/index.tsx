import React, { useState, useEffect } from 'react';
import { Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import AdicionarClienteModal from './components/AdicionarClienteModal';
import ListagemCliente from './components/ListagemCliente';
import api from '../../client/api';
import { AxiosError } from 'axios';
import AddIcon from '@mui/icons-material/Add';

interface Cliente {
    cliente_id: number;
    email: string;
    username: string;
    nome: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
}

const ClienteForm: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentCliente, setCurrentCliente] = useState<Cliente | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpenModal = (cliente?: Cliente) => {
        if (cliente) {
            setCurrentCliente(cliente);
        } else {
            setCurrentCliente(null);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setCurrentCliente(null);
        setOpenModal(false);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const fetchClientes = async () => {
        try {
            const response = await api.get('/clientes');
            const sortedClientes = response.data.sort((a: Cliente, b: Cliente) => a.cliente_id - b.cliente_id);
            setClientes(sortedClientes);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarCliente = async (novoCliente: Partial<Cliente>) => {
        try {
            if (currentCliente) {
                const novoConteudo: Partial<Cliente> = {
                    nome: novoCliente.nome || currentCliente.nome,
                    telefone: novoCliente.telefone || currentCliente.telefone,
                    data_nascimento: novoCliente.data_nascimento || currentCliente.data_nascimento,
                };

                await api.put(`/clientes/${currentCliente.cliente_id}`, novoConteudo);

                setClientes(prevClientes =>
                    prevClientes
                        .map(cliente =>
                            cliente.cliente_id === currentCliente.cliente_id ? { ...cliente, ...novoConteudo } : cliente
                        )
                        .sort((a, b) => a.cliente_id - b.cliente_id)
                );

                handleCloseModal();
            } else {
                const response = await api.post('/clientes', { ...novoCliente, endereco_id: 1 });
                console.log('Cliente adicionado com sucesso:', response.data);
                setClientes(prevClientes => [...prevClientes, response.data].sort((a, b) => a.cliente_id - b.cliente_id));
                handleCloseModal();
            }
        } catch (error) {
            const err = JSON.parse((error as AxiosError).request?.response);
            console.error('Erro ao adicionar cliente:', error);
            setSnackbarMessage(err.message || 'Erro ao adicionar cliente');
            setOpenSnackbar(true);
        }
    };

    const handleEditCliente = async (clienteId: number, novoConteudo: Partial<Cliente>) => {
        try {
            const clienteAtual = clientes.find(c => c.cliente_id === clienteId);
            if (!clienteAtual) {
                throw new Error(`Cliente com ID ${clienteId} não encontrado.`);
            }

            const camposAlterados: Partial<Cliente> = {};

            if (clienteAtual.nome !== novoConteudo.nome) {
                camposAlterados.nome = novoConteudo.nome;
            }

            if (clienteAtual.telefone !== novoConteudo.telefone) {
                camposAlterados.telefone = novoConteudo.telefone;
            }

            if (clienteAtual.data_nascimento !== novoConteudo.data_nascimento) {
                camposAlterados.data_nascimento = novoConteudo.data_nascimento;
            }

            if (Object.keys(camposAlterados).length > 0) {
                await api.put(`/clientes/${clienteId}`, camposAlterados);

                setClientes(prevClientes =>
                    prevClientes
                        .map(cliente =>
                            cliente.cliente_id === clienteId ? { ...cliente, ...camposAlterados } : cliente
                        )
                        .sort((a, b) => a.cliente_id - b.cliente_id)
                );

                await fetchClientes();
            } else {
                console.warn('Nenhum campo foi alterado.');
            }
        } catch (error) {
            const err = JSON.parse((error as AxiosError).request?.response);
            console.error(`Erro ao editar cliente ${clienteId}:`, error);
            setSnackbarMessage(err.message || `Erro ao editar cliente ${clienteId}`);
            setOpenSnackbar(true);
        }
    };

    const handleDeleteCliente = async (clienteId: number) => {
        try {
            await api.delete(`/clientes/${clienteId}`);
            setClientes(prevClientes => prevClientes.filter(cliente => cliente.cliente_id !== clienteId));
        } catch (error) {
            const err = JSON.parse((error as AxiosError).request?.response);
            console.error(`Erro ao excluir cliente ${clienteId}:`, error);
            setSnackbarMessage(err.message || `Erro ao excluir cliente ${clienteId}`);
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        fetchClientes();
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
            <Button onClick={() => handleOpenModal()} variant="contained" color="primary" sx={{ mb: 2 }}>
                <AddIcon /> Adicionar Novo Cliente
            </Button>

            <ListagemCliente
                clientes={clientes}
                onEditCliente={handleOpenModal}
                onDeleteCliente={handleDeleteCliente}
            />

            <AdicionarClienteModal
                open={openModal}
                onClose={handleCloseModal}
                onClienteAdded={adicionarCliente}
                clienteInicial={currentCliente}
            />

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ClienteForm;
