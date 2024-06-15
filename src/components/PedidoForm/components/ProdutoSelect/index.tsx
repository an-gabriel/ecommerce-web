import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Produto {
    produto_id: number;
    nome_produto: string;
    preco_produto: number;
}

interface ProdutoSelectProps {
    produtoSelecionado: Produto | null;
    setProdutoSelecionado: (produto: Produto | null) => void;
    produtos: Produto[];
    setPrecoProduto: (preco: number) => void;
}

const ProdutoSelect: React.FC<ProdutoSelectProps> = ({ produtoSelecionado, setProdutoSelecionado, produtos, setPrecoProduto }) => {
    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="produto-select">Produto</InputLabel>
            <Select
                labelId="produto-select"
                id="produto-select"
                value={produtoSelecionado ? produtoSelecionado.produto_id : ''}
                onChange={(e) => {
                    const selectedProduto = produtos.find((produto) => produto.produto_id === Number(e.target.value));
                    if (selectedProduto) {
                        setProdutoSelecionado(selectedProduto);
                        setPrecoProduto(selectedProduto.preco_produto);
                    } else {
                        setProdutoSelecionado(null);
                        setPrecoProduto(0);
                    }
                }}
                fullWidth
                label="Produto"
            >
                {produtos.map((produto) => (
                    <MenuItem key={produto.produto_id} value={produto.produto_id}>
                        {produto.nome_produto}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ProdutoSelect;
