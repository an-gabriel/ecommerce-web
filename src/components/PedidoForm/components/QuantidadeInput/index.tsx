import React from 'react';
import { TextField } from '@mui/material';

interface QuantidadeInputProps {
    quantidadeProduto: number;
    setQuantidadeProduto: (quantidade: number) => void;
}

const QuantidadeInput: React.FC<QuantidadeInputProps> = ({ quantidadeProduto, setQuantidadeProduto }) => {
    return (
        <TextField
            label="Quantidade"
            type="number"
            value={quantidadeProduto}
            onChange={(e) => setQuantidadeProduto(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
        />
    );
};

export default QuantidadeInput;
