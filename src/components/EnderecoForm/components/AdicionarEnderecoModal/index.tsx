import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Endereco {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    numero: string;
    complemento?: string;
    uf: string;
}

interface AdicionarEnderecoModalProps {
    open: boolean;
    onClose: () => void;
    onEnderecoAdded: (novoEndereco: Partial<Endereco>) => Promise<void>;
}

const AdicionarEnderecoModal: React.FC<AdicionarEnderecoModalProps> = ({ open, onClose, onEnderecoAdded }) => {
    const initialValues: Endereco = {
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        numero: '',
        complemento: '',
        uf: '',
    };

    const validationSchema = Yup.object({
        cep: Yup.string().max(9, 'CEP deve ter no máximo 9 caracteres').required('CEP é obrigatório'),
        rua: Yup.string().max(100, 'Rua deve ter no máximo 100 caracteres').required('Rua é obrigatória'),
        bairro: Yup.string().max(30, 'Bairro deve ter no máximo 30 caracteres').required('Bairro é obrigatório'),
        cidade: Yup.string().max(30, 'Cidade deve ter no máximo 30 caracteres').required('Cidade é obrigatória'),
        numero: Yup.string().max(10, 'Número deve ter no máximo 10 caracteres').required('Número é obrigatório'),
        complemento: Yup.string().max(100, 'Complemento deve ter no máximo 100 caracteres'),
        uf: Yup.string().max(2, 'UF deve ter no máximo 2 caracteres').required('UF é obrigatório'),
    });

    const handleSubmit = async (values: Endereco) => {
        await onEnderecoAdded(values);
        onClose();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-adicionar-endereco" aria-describedby="modal-para-adicionar-um-novo-endereco">
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
                    Novo Endereço
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="CEP"
                        id="cep"
                        name="cep"
                        value={formik.values.cep}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.cep && Boolean(formik.errors.cep)}
                        helperText={formik.touched.cep && formik.errors.cep}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Rua"
                        id="rua"
                        name="rua"
                        value={formik.values.rua}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.rua && Boolean(formik.errors.rua)}
                        helperText={formik.touched.rua && formik.errors.rua}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Bairro"
                        id="bairro"
                        name="bairro"
                        value={formik.values.bairro}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.bairro && Boolean(formik.errors.bairro)}
                        helperText={formik.touched.bairro && formik.errors.bairro}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cidade"
                        id="cidade"
                        name="cidade"
                        value={formik.values.cidade}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.cidade && Boolean(formik.errors.cidade)}
                        helperText={formik.touched.cidade && formik.errors.cidade}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Número"
                        id="numero"
                        name="numero"
                        value={formik.values.numero}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.numero && Boolean(formik.errors.numero)}
                        helperText={formik.touched.numero && formik.errors.numero}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Complemento"
                        id="complemento"
                        name="complemento"
                        value={formik.values.complemento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.complemento && Boolean(formik.errors.complemento)}
                        helperText={formik.touched.complemento && formik.errors.complemento}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="UF"
                        id="uf"
                        name="uf"
                        value={formik.values.uf}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.uf && Boolean(formik.errors.uf)}
                        helperText={formik.touched.uf && formik.errors.uf}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Salvar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AdicionarEnderecoModal;
