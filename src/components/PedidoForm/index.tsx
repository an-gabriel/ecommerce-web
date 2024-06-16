import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Grid, FormHelperText } from '@mui/material';
import PedidoProdutoGrid, { PedidoProduto } from './components/PedidoProdutoGrid';
import AdicionarProdutoModal from './components/AdicionarProdutoModal';
import AddIcon from '@mui/icons-material/Add';
import api from '../../client/api'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface Produto {
    produto_id: number;
    nome_produto: string;
    preco_produto: number;
}

const PedidoForm: React.FC = () => {
    const [pedidoId, setPedidoId] = useState<number | null>(null);
    const [produtosPedido, setProdutosPedido] = useState<PedidoProduto[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
    const [precoProduto, setPrecoProduto] = useState<number>(0);
    const [openModal, setOpenModal] = useState(false);

    const produtos: Produto[] = [
        { produto_id: 1, nome_produto: 'Produto 1', preco_produto: 10.0 },
        { produto_id: 2, nome_produto: 'Produto 2', preco_produto: 20.0 },
        { produto_id: 3, nome_produto: 'Produto 3', preco_produto: 30.0 },
    ];

    const initialValues = {
        numero_pedido: '',
        valor_total_pedido: 0,
        data_pedido: new Date().toISOString().substring(0, 10),
        status: 'ativo',
        cliente_id: 1
    };

    const validationSchema = Yup.object({
        numero_pedido: Yup.number().required('Número do Pedido é obrigatório'),
        data_pedido: Yup.date().required('Data do Pedido é obrigatória'),
        status: Yup.string().required('Status é obrigatório'),
        cliente_id: Yup.number().required('Cliente ID é obrigatório'),
        valor_total_pedido: Yup.number().required('Valor Total é obrigatório'),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        const novoPedido = {
            numero_pedido: parseInt(values.numero_pedido),
            valor_total_pedido: produtosPedido.reduce((total, produto) => total + produto.qtd_produto_pedido * produto.preco_produto_pedido, 0),
            data_pedido: new Date(values.data_pedido).toISOString(),
            status: values.status === 'ativo',
            cliente_id: values.cliente_id
        };

        try {
            if (pedidoId === null) {
                const response = await api.post('/pedidos', novoPedido);
                const generatedPedidoId = response.data.pedido_id;
                setPedidoId(generatedPedidoId);
            } else {
                await api.put(`/pedidos/${pedidoId}`, {
                    valor_total_pedido: produtosPedido.reduce((total, produto) => total + produto.qtd_produto_pedido * produto.preco_produto_pedido, 0),
                    data_pedido: new Date(values.data_pedido).toISOString(),
                    status: values.status === 'ativo'
                });
            }

            await Promise.all(produtosPedido.map(async (produtoPedido) => {
                const { produto_id, qtd_produto_pedido, preco_produto_pedido } = produtoPedido;
                console.log({ produto_id, qtd_produto_pedido, preco_produto_pedido, pedidoId })
                await api.post('/produto-pedido', {
                    produto_id,
                    qtd_produto_pedido,
                    preco_produto_pedido,
                    pedido_id: pedidoId || 0
                });
            }));

            console.log('Pedido e produtos associados enviados com sucesso.');

        } catch (error) {
            console.error('Erro ao salvar pedido e produtos:', error);
        }
    };

    const adicionarProdutoPedido = () => {
        if (produtoSelecionado && pedidoId !== null) {
            const novoPedidoProduto: PedidoProduto = {
                produto_pedido_id: produtosPedido.length + 1,
                qtd_produto_pedido: quantidadeProduto,
                preco_produto_pedido: precoProduto,
                produto_id: produtoSelecionado.produto_id,
                pedido_id: pedidoId
            };
            setProdutosPedido([...produtosPedido, novoPedidoProduto]);
            setProdutoSelecionado(null);
            setQuantidadeProduto(1);
            setPrecoProduto(0);
            setOpenModal(false);
        }
    };

    const handleOpenModal = () => {
        if (pedidoId !== null) {
            setOpenModal(true);
        } else {
            alert('Por favor, registre o pedido antes de adicionar produtos.');
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                    <Box sx={{ mt: 2, position: 'relative', minHeight: '80vh' }}>
                        <Typography variant="h6" gutterBottom>
                            Novo Pedido
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    name="pedido_id"
                                    label="Pedido ID"
                                    value={pedidoId || ''}
                                    fullWidth
                                    disabled
                                    InputProps={{
                                        style: { width: '200px', textAlign: 'center' }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Field
                                    as={TextField}
                                    name="numero_pedido"
                                    label="Número do Pedido"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        style: { width: '300px' }
                                    }}
                                />
                                <ErrorMessage name="numero_pedido" component={FormHelperText} />

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="status-select">Status</InputLabel>
                                    <Field
                                        as={Select}
                                        name="status"
                                        labelId="status-select"
                                        id="status-select"
                                        label="Status"
                                    >
                                        <MenuItem value="ativo">Ativo</MenuItem>
                                        <MenuItem value="inativo">Inativo</MenuItem>
                                    </Field>
                                    <ErrorMessage name="status" component={FormHelperText} />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Field
                            as={TextField}
                            name="data_pedido"
                            label="Data do Pedido"
                            type="date"
                            fullWidth
                            sx={{ mb: 2 }}
                            InputLabelProps={{
                                style: { width: '300px' },
                                shrink: true
                            }}
                        />
                        <ErrorMessage name="data_pedido" component={FormHelperText} />

                        <Field
                            as={TextField}
                            name="valor_total_pedido"
                            label="Valor Total"
                            fullWidth
                            disabled
                            value={produtosPedido.reduce((total, produto) => total + produto.qtd_produto_pedido * produto.preco_produto_pedido, 0).toFixed(2)}
                            sx={{ mb: 2 }}
                        />
                        <ErrorMessage name="valor_total_pedido" component={FormHelperText} />

                        <Box sx={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={pedidoId !== null}>
                                        Registrar pedido
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={pedidoId === null}
                                        onClick={() => handleSubmit(values)}
                                    >
                                        Salvar Pedido
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                        {pedidoId !== null && (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpenModal}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    style={{ width: '250px' }}
                                >
                                    <AddIcon />
                                    Adicionar Produto
                                </Button>

                                <PedidoProdutoGrid produtosPedido={produtosPedido} />
                            </>
                        )}

                        <AdicionarProdutoModal
                            open={openModal}
                            handleClose={handleCloseModal}
                            produtoSelecionado={produtoSelecionado}
                            setProdutoSelecionado={setProdutoSelecionado}
                            quantidadeProduto={quantidadeProduto}
                            setQuantidadeProduto={setQuantidadeProduto}
                            precoProduto={precoProduto}
                            setPrecoProduto={setPrecoProduto}
                            pedidoId={pedidoId}
                            produtos={produtos}
                            adicionarProdutoPedido={adicionarProdutoPedido}
                        />
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default PedidoForm;
