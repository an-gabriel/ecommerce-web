import React from 'react';
import { TextField } from '@mui/material';

interface PrecoInputProps {
    precoProduto: number;
    setPrecoProduto: (preco: number) => void;
}

const PrecoInput: React.FC<PrecoInputProps> = ({ precoProduto, setPrecoProduto }) => {
    return (
        <TextField
            label="Preço do Produto"
            type="number"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
        />
    );
};

export default PrecoInput;
