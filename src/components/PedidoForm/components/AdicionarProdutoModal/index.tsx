import React from 'react';
import { Modal, Box, Typography, Grid, Button, TextField } from '@mui/material';
import ProdutoSelect from '../ProdutoSelect';
import QuantidadeInput from '../QuantidadeInput';
import PrecoInput from '../PrecoInput';

interface Produto {
    produto_id: number;
    nome_produto: string;
    preco_produto: number;
}

interface AdicionarProdutoModalProps {
    open: boolean;
    handleClose: () => void;
    produtoSelecionado: Produto | null;
    setProdutoSelecionado: (produto: Produto | null) => void;
    quantidadeProduto: number;
    setQuantidadeProduto: (quantidade: number) => void;
    precoProduto: number;
    setPrecoProduto: (preco: number) => void;
    pedidoId: number | null;
    produtos: Produto[];
    adicionarProdutoPedido: () => void;
}

const AdicionarProdutoModal: React.FC<AdicionarProdutoModalProps> = ({
    open,
    handleClose,
    produtoSelecionado,
    setProdutoSelecionado,
    quantidadeProduto,
    setQuantidadeProduto,
    precoProduto,
    setPrecoProduto,
    pedidoId,
    produtos,
    adicionarProdutoPedido
}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-adicionar-produto-title"
            aria-describedby="modal-adicionar-produto-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Adicionar Produto ao Pedido
                </Typography>
                <TextField
                    label="ID do Produto Pedido"
                    value={pedidoId !== null ? pedidoId : ''}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{
                        readOnly: true,
                    }}
                    style={{ display: 'none' }}
                />
                <ProdutoSelect
                    produtoSelecionado={produtoSelecionado}
                    setProdutoSelecionado={setProdutoSelecionado}
                    produtos={produtos}
                    setPrecoProduto={setPrecoProduto}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <QuantidadeInput
                            quantidadeProduto={quantidadeProduto}
                            setQuantidadeProduto={setQuantidadeProduto}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <PrecoInput
                            precoProduto={precoProduto}
                            setPrecoProduto={setPrecoProduto}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="ID do Pedido"
                            value={pedidoId !== null ? pedidoId : ''}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={adicionarProdutoPedido} fullWidth>
                            Adicionar Produto
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default AdicionarProdutoModal;
