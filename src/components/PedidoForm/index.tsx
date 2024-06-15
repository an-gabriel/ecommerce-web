import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from '@mui/material';
import PedidoProdutoGrid, { PedidoProduto } from '../PedidoProdutoGrid';
import AdicionarProdutoModal from './components/AdicionarProdutoModal';
import AddIcon from '@mui/icons-material/Add';

interface Produto {
    produto_id: number;
    nome_produto: string;
    preco_produto: number;
}

const PedidoForm: React.FC = () => {
    const [dataPedido, setDataPedido] = useState(() => {
        const hoje = new Date();
        const ano = hoje.getFullYear().toString().padStart(4, '0');
        const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
        const dia = hoje.getDate().toString().padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    });

    const [numeroPedido, setNumeroPedido] = useState('');
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [status, setStatus] = useState('ativo');
    const [produtosPedido, setProdutosPedido] = useState<PedidoProduto[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
    const [precoProduto, setPrecoProduto] = useState<number>(0);
    const [pedidoId, setPedidoId] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const produtos: Produto[] = [
        { produto_id: 1, nome_produto: 'Produto 1', preco_produto: 10.0 },
        { produto_id: 2, nome_produto: 'Produto 2', preco_produto: 20.0 },
        { produto_id: 3, nome_produto: 'Produto 3', preco_produto: 30.0 },
    ];

    useEffect(() => {
        const calcularValorTotal = () => {
            let total = 0;
            produtosPedido.forEach((produto) => {
                total += produto.qtd_produto_pedido * produto.preco_produto_pedido;
            });
            setValorTotal(total);
        };

        calcularValorTotal();
    }, [produtosPedido]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({ numeroPedido, valorTotal, dataPedido, status, produtosPedido });

        const generatedPedidoId = Math.floor(Math.random() * 1000);
        setPedidoId(generatedPedidoId);
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
            alert('Por favor, cadastre o pedido antes de adicionar produtos.');
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, position: 'relative', minHeight: '80vh' }}>
            <Typography variant="h6" gutterBottom>
                Novo Pedido
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Pedido ID"
                        value={pedidoId || ''}
                        fullWidth
                        disabled
                        InputProps={{
                            style: { width: '200px', textAlign: 'center' },
                            disableUnderline: true
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TextField
                        label="Número do Pedido"
                        value={numeroPedido}
                        onChange={(e) => setNumeroPedido(e.target.value)}
                        InputProps={{
                            style: { width: '300px' }
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel htmlFor="status-select">Status</InputLabel>
                        <Select
                            labelId="status-select"
                            id="status-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as string)}
                            label="Status"
                        >
                            <MenuItem value="ativo">Ativo</MenuItem>
                            <MenuItem value="inativo">Inativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <TextField
                label="Data do Pedido"
                type="date"
                value={dataPedido}
                onChange={(e) => setDataPedido(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{
                    style: { width: '300px' },
                    shrink: true
                }}
            />

            <TextField
                label="Valor Total"
                value={valorTotal.toFixed(2)}
                fullWidth
                disabled
                sx={{ mb: 2 }}
            />

            <Box sx={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Cadastrar Pedido
                </Button>
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
    );
};

export default PedidoForm;
