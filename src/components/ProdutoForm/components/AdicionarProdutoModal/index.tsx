import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../../../client/api';

interface Categoria {
    categoria_id: number;
    nome_categoria: string;
}

interface Produto {
    nome_produto: string;
    descricao_produto: string;
    preco_produto: number;
    qtd_estoque: number;
    categoria_id: number;
    imagem: string;
}

interface AdicionarProdutoModalProps {
    open: boolean;
    onClose: () => void;
    onProdutoAdded: (novoProduto: Partial<Produto>) => Promise<void>;
}

const AdicionarProdutoModal: React.FC<AdicionarProdutoModalProps> = ({ open, onClose, onProdutoAdded }) => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const initialValues: Produto = {
        nome_produto: '',
        descricao_produto: '',
        preco_produto: 0,
        qtd_estoque: 0,
        categoria_id: 0,
        imagem: '',
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const validationSchema = Yup.object({
        nome_produto: Yup.string().max(50, 'Nome deve ter no máximo 50 caracteres').required('Nome é obrigatório'),
        descricao_produto: Yup.string().max(200, 'Descrição deve ter no máximo 200 caracteres'),
        preco_produto: Yup.number().min(0, 'Preço não pode ser negativo').required('Preço é obrigatório'),
        qtd_estoque: Yup.number().min(0, 'Quantidade em Estoque não pode ser negativa').required('Quantidade em Estoque é obrigatória'),
        categoria_id: Yup.number().positive('Selecione uma categoria').required('Categoria é obrigatória'),
        imagem: Yup.string().required('URL da Imagem é obrigatória'),
    });

    const handleSubmit = async (values: Produto) => {
        try {
            await onProdutoAdded(values);
            onClose();
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            const floatValue = parseFloat(value);

            formik.setFieldValue('preco_produto', isNaN(floatValue) ? 0 : floatValue);
        }
    };


    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-adicionar-produto" aria-describedby="modal-para-adicionar-um-novo-produto">
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
                    Adicionar Novo Produto
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome do Produto"
                        id="nome_produto"
                        name="nome_produto"
                        value={formik.values.nome_produto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nome_produto && Boolean(formik.errors.nome_produto)}
                        helperText={formik.touched.nome_produto && formik.errors.nome_produto}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Descrição do Produto"
                        id="descricao_produto"
                        name="descricao_produto"
                        multiline
                        rows={4}
                        value={formik.values.descricao_produto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.descricao_produto && Boolean(formik.errors.descricao_produto)}
                        helperText={formik.touched.descricao_produto && formik.errors.descricao_produto}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Preço do Produto"
                        id="preco_produto"
                        name="preco_produto"
                        type="text"
                        value={formik.values.preco_produto}
                        onChange={(e) => {
                            handlePrecoChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.touched.preco_produto && Boolean(formik.errors.preco_produto)}
                        helperText={formik.touched.preco_produto && formik.errors.preco_produto}
                        fullWidth
                        inputProps={{
                            inputMode: 'decimal',
                            pattern: '[0-9]*[.,]?[0-9]{0,2}',
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Quantidade em Estoque"
                        id="qtd_estoque"
                        name="qtd_estoque"
                        type="number"
                        value={formik.values.qtd_estoque}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.qtd_estoque && Boolean(formik.errors.qtd_estoque)}
                        helperText={formik.touched.qtd_estoque && formik.errors.qtd_estoque}
                        fullWidth
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Categoria"
                        id="categoria_id"
                        name="categoria_id"
                        value={formik.values.categoria_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.categoria_id && Boolean(formik.errors.categoria_id)}
                        helperText={formik.touched.categoria_id && formik.errors.categoria_id}
                        fullWidth
                    >
                        {categorias.map((categoria) => (
                            <MenuItem key={`${categoria.categoria_id}`} value={categoria.categoria_id}>
                                {categoria.nome_categoria}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        label="URL da Imagem"
                        id="imagem"
                        name="imagem"
                        value={formik.values.imagem}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.imagem && Boolean(formik.errors.imagem)}
                        helperText={formik.touched.imagem && formik.errors.imagem}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Salvar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AdicionarProdutoModal;
