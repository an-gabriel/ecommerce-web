import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Cliente {
    email: string;
    username: string;
    senha: string;
    nome: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
}

interface AdicionarClienteModalProps {
    open: boolean;
    onClose: () => void;
    onClienteAdded: (novoCliente: Partial<Cliente>) => Promise<void>;
}

const AdicionarClienteModal: React.FC<AdicionarClienteModalProps> = ({ open, onClose, onClienteAdded }) => {
    const initialValues: Cliente = {
        email: '',
        username: '',
        senha: '',
        nome: '',
        cpf: '',
        telefone: '',
        data_nascimento: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().max(50, 'E-mail deve ter no máximo 50 caracteres').email('Formato de e-mail inválido').required('E-mail é obrigatório'),
        username: Yup.string().max(15, 'Username deve ter no máximo 15 caracteres').required('Username é obrigatório'),
        senha: Yup.string().max(20, 'Senha deve ter no máximo 20 caracteres').required('Senha é obrigatória'),
        nome: Yup.string().max(200, 'Nome deve ter no máximo 200 caracteres').required('Nome é obrigatório'),
        cpf: Yup.string().max(11, 'CPF deve ter no máximo 11 caracteres').required('CPF é obrigatório'),
        telefone: Yup.string().max(11, 'Telefone deve ter no máximo 11 caracteres').required('Telefone é obrigatório'),
        data_nascimento: Yup.string().required('Data de Nascimento é obrigatória'),
    });
    const handleSubmit = async (values: Cliente) => {
        // Enviar os valores para o backend
        await onClienteAdded(values);
        onClose();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-adicionar-cliente" aria-describedby="modal-para-adicionar-um-novo-cliente">
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
                    Novo Cliente
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="E-mail"
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
                        label="Senha"
                        id="senha"
                        name="senha"
                        type="password"
                        value={formik.values.senha}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.senha && Boolean(formik.errors.senha)}
                        helperText={formik.touched.senha && formik.errors.senha}
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
                        type="date"
                        value={formik.values.data_nascimento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.data_nascimento && Boolean(formik.errors.data_nascimento)}
                        helperText={formik.touched.data_nascimento && formik.errors.data_nascimento}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Salvar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AdicionarClienteModal;
