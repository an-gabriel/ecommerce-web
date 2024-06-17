import React, { useEffect } from 'react';
import { TextField, Button, Typography, Modal, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../../../client/api';

interface Cliente {
    cliente_id: number;
    email: string;
    username: string;
    nome: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
}

interface AdicionarClienteModalProps {
    open: boolean;
    onClose: () => void;
    onClienteAdded: (cliente: Partial<Cliente>) => void;
    clienteInicial?: Cliente | null;
}

const AdicionarClienteModal: React.FC<AdicionarClienteModalProps> = ({ open, onClose, onClienteAdded, clienteInicial }) => {
    const initialValues: Cliente = clienteInicial || {
        cliente_id: 0,
        email: '',
        username: '',
        nome: '',
        cpf: '',
        telefone: '',
        data_nascimento: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        username: Yup.string().required('Username é obrigatório'),
        nome: Yup.string().required('Nome é obrigatório'),
        cpf: Yup.string().required('CPF é obrigatório'),
        telefone: Yup.string().required('Telefone é obrigatório'),
        data_nascimento: Yup.string().required('Data de Nascimento é obrigatória'),
    });

    const handleSubmit = async (values: Cliente) => {
        try {
            console.log(values)
            let response;

            if (values.cliente_id) {
                const newValues = {
                    username: values.username,
                    nome: values.nome,
                    telefone: values.telefone,
                    data_nascimento: values.data_nascimento,
                };
                console.log("🚀 ~ handleSubmit ~ newValues:", newValues)
                response = await api.put(`/clientes/${values.cliente_id}`, newValues);
            } else {
                response = await api.post('/clientes', values);
            }

            onClienteAdded(response.data);
            onClose();
        } catch (error) {
            console.error('Erro ao salvar o cliente:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (clienteInicial) {
            formik.setValues(clienteInicial);
        }
    }, [clienteInicial]);

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-adicionar-cliente" aria-describedby="modal-para-adicionar-ou-editar-um-cliente">
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                width: 400,
                maxWidth: '90%',
            }}>
                <Typography variant="h6" gutterBottom>
                    {clienteInicial ? 'Editar Cliente' : 'Novo Cliente'}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Username"
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Nome"
                        id="nome"
                        name="nome"
                        value={formik.values.nome}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nome && Boolean(formik.errors.nome)}
                        helperText={formik.touched.nome && formik.errors.nome}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="CPF"
                        id="cpf"
                        name="cpf"
                        value={formik.values.cpf}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                        helperText={formik.touched.cpf && formik.errors.cpf}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Telefone"
                        id="telefone"
                        name="telefone"
                        value={formik.values.telefone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.telefone && Boolean(formik.errors.telefone)}
                        helperText={formik.touched.telefone && formik.errors.telefone}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Data de Nascimento"
                        id="data_nascimento"
                        name="data_nascimento"
                        value={formik.values.data_nascimento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.data_nascimento && Boolean(formik.errors.data_nascimento)}
                        helperText={formik.touched.data_nascimento && formik.errors.data_nascimento}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        {clienteInicial ? 'Salvar Edição' : 'Adicionar'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AdicionarClienteModal;
