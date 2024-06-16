import React from 'react';
import { TextField, Button, Typography, Modal, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../../../client/api';

interface Categoria {
    categoria_id: number;
    nome_categoria: string;
    descricao_categoria: string;
}

interface AdicionarCategoriaModalProps {
    open: boolean;
    onClose: () => void;
    onCategoriaAdded: (novaCategoria: Categoria) => void;
    categoriaInicial?: Categoria | null;
}

const AdicionarCategoriaModal: React.FC<AdicionarCategoriaModalProps> = ({ open, onClose, onCategoriaAdded, categoriaInicial }) => {
    const initialValues: Categoria = categoriaInicial || {
        categoria_id: 0,
        nome_categoria: '',
        descricao_categoria: '',
    };

    const validationSchema = Yup.object({
        nome_categoria: Yup.string()
            .max(20, 'Nome da Categoria deve ter no máximo 20 caracteres')
            .required('Nome da Categoria é obrigatório'),
        descricao_categoria: Yup.string()
            .max(200, 'Descrição da Categoria deve ter no máximo 200 caracteres')
            .required('Descrição da Categoria é obrigatória'),
    });

    const handleSubmit = async (values: Categoria) => {
        try {
            let response;
            if (categoriaInicial) {
                response = await api.put(`/categorias/${values.categoria_id}`, values);
            } else {
                response = await api.post('/categorias', values);
            }
            console.log('Categoria salva com sucesso:', response.data);

            onCategoriaAdded(response.data);

            onClose();
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-adicionar-categoria"
            aria-describedby="modal-para-adicionar-ou-editar-uma-categoria"
        >
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
                    {categoriaInicial ? 'Editar Categoria' : 'Nova Categoria'}
                </Typography>
                <TextField
                    label="Nome da Categoria"
                    id="nome_categoria"
                    name="nome_categoria"
                    value={formik.values.nome_categoria}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nome_categoria && Boolean(formik.errors.nome_categoria)}
                    helperText={formik.touched.nome_categoria && formik.errors.nome_categoria}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 20 }}
                />
                <TextField
                    label="Descrição da Categoria"
                    id="descricao_categoria"
                    name="descricao_categoria"
                    value={formik.values.descricao_categoria}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.descricao_categoria && Boolean(formik.errors.descricao_categoria)}
                    helperText={formik.touched.descricao_categoria && formik.errors.descricao_categoria}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 200 }}
                    multiline
                    rows={4}
                    maxRows={8}
                />
                <Button type="button" variant="contained" color="primary" onClick={() => formik.handleSubmit}>
                    Salvar
                </Button>
            </Box>
        </Modal>
    );
};

export default AdicionarCategoriaModal;