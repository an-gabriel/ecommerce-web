import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

interface Cliente {
    id: number;
    email: string;
    username: string;
    nome: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
}

interface ListagemClienteProps {
    clientes: Cliente[];
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
}

const ListagemCliente: React.FC<ListagemClienteProps> = ({ clientes, rowsPerPageOptions = [5, 10, 25], defaultRowsPerPage = 5 }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Data de Nascimento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((cliente) => (
                                <TableRow key={cliente.id}>
                                    <TableCell>{cliente.id}</TableCell>
                                    <TableCell>{cliente.email}</TableCell>
                                    <TableCell>{cliente.username}</TableCell>
                                    <TableCell>{cliente.nome}</TableCell>
                                    <TableCell>{cliente.cpf}</TableCell>
                                    <TableCell>{cliente.telefone}</TableCell>
                                    <TableCell>{cliente.data_nascimento}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={clientes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListagemCliente;
