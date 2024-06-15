import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import api from '../../client/api';

// Interface para os valores do formulário
interface CategoriaFormValues {
    nomeCategoria: string;
    descricaoCategoria: string;
}

const CategoriaForm: React.FC = () => {
    const initialValues: CategoriaFormValues = {
        nomeCategoria: '',
        descricaoCategoria: '',
    };

    const validationSchema = Yup.object({
        nomeCategoria: Yup.string()
            .max(20, 'Nome da Categoria deve ter no máximo 20 caracteres')
            .required('Nome da Categoria é obrigatório'),
        descricaoCategoria: Yup.string()
            .max(200, 'Descrição da Categoria deve ter no máximo 200 caracteres')
            .required('Descrição da Categoria é obrigatória'),
    });


    const handleSubmit = async (
        values: CategoriaFormValues,
        formikHelpers: FormikHelpers<CategoriaFormValues>
    ) => {
        try {
            const response = await api.post('/categorias', JSON.stringify({
                nome_categoria: values.nomeCategoria,
                descricao_categoria: values.descricaoCategoria,
            }));
            console.log('Categoria cadastrada com sucesso:', response.data);
            formikHelpers.resetForm();
        } catch (error) {
            console.error('Erro ao cadastrar categoria:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Nova Categoria
            </Typography>
            <TextField
                label="Nome da Categoria"
                id="nomeCategoria"
                name="nomeCategoria"
                value={formik.values.nomeCategoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nomeCategoria && Boolean(formik.errors.nomeCategoria)}
                helperText={formik.touched.nomeCategoria && formik.errors.nomeCategoria}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 20 }}
            />
            <TextField
                label="Descrição da Categoria"
                id="descricaoCategoria"
                name="descricaoCategoria"
                value={formik.values.descricaoCategoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.descricaoCategoria && Boolean(formik.errors.descricaoCategoria)}
                helperText={formik.touched.descricaoCategoria && formik.errors.descricaoCategoria}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 200 }}
                multiline
                rows={4}
                maxRows={8}
            />
            <Button type="submit" variant="contained" color="primary">
                Salvar
            </Button>
        </Box>
    );
};

export default CategoriaForm;
