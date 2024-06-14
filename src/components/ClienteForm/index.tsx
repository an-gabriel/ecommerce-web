import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ClienteForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({ email, username, senha, nome, cpf, telefone, dataNascimento });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Novo Cliente
            </Typography>
            <TextField
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Data de Nascimento"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" color="primary">
                Salvar
            </Button>
        </Box>
    );
};

export default ClienteForm;
