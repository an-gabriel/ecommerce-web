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
    const [currentEndereco, setCurrentEndereco] = useState<Endereco | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleOpenModal = (endereco?: Endereco) => {
        if (endereco) {
            setCurrentEndereco(endereco);
        } else {
            setCurrentEndereco(null);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setCurrentEndereco(null);
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
            if (currentEndereco) {
                const { cep, ...rest } = novoEndereco

                console.log(rest)
                const response = await api.put(`/enderecos/${currentEndereco.endereco_id}`, rest);
                console.log('Endereço atualizado com sucesso:', response.data);
            } else {
                console.log("aqui")
                const response = await api.post('/enderecos', novoEndereco);
                console.log('Endereço adicionado com sucesso:', response.data);
            }
            await fetchEnderecos();
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao adicionar/atualizar endereço:', error);
            setError('Erro ao adicionar/atualizar endereço. Tente novamente mais tarde.');
        }
    };

    const handleDeleteEndereco = async (enderecoId: number) => {
        try {
            await api.delete(`/enderecos/${enderecoId}`);
            setEnderecos(prevEnderecos => prevEnderecos.filter(endereco => endereco.endereco_id !== enderecoId));
        } catch (error) {
            console.error('Erro ao deletar endereço:', error);
            setError('Erro ao deletar endereço. Tente novamente mais tarde.');
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
            <Button onClick={() => handleOpenModal()} variant="contained" color="primary" sx={{ mb: 2 }}>
                + Adicionar Novo Endereço
            </Button>

            <EnderecoListagem
                enderecos={enderecos}
                onEditEndereco={handleOpenModal}
                onDeleteEndereco={handleDeleteEndereco}
            />

            <AdicionarEnderecoModal
                open={openModal}
                onClose={handleCloseModal}
                onEnderecoAdded={adicionarEndereco}
                enderecoInicial={currentEndereco}
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
