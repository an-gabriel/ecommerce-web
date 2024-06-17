import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Endereco {
    endereco_id: number;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    numero: string;
    complemento?: string;
    uf: string;
}

interface EnderecoListagemProps {
    enderecos: Endereco[];
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
    onEditEndereco: (endereco: Endereco) => void;
    onDeleteEndereco: (enderecoId: number) => void;
}

const ListagemEndereco: React.FC<EnderecoListagemProps> = ({
    enderecos,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 5,
    onEditEndereco,
    onDeleteEndereco
}) => {
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
                            <TableCell>CEP</TableCell>
                            <TableCell>Rua</TableCell>
                            <TableCell>Bairro</TableCell>
                            <TableCell>Cidade</TableCell>
                            <TableCell>Número</TableCell>
                            <TableCell>Complemento</TableCell>
                            <TableCell>UF</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {enderecos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((endereco) => (
                            <TableRow key={endereco.endereco_id}>
                                <TableCell>{endereco.endereco_id}</TableCell>
                                <TableCell>{endereco.cep}</TableCell>
                                <TableCell>{endereco.rua}</TableCell>
                                <TableCell>{endereco.bairro}</TableCell>
                                <TableCell>{endereco.cidade}</TableCell>
                                <TableCell>{endereco.numero}</TableCell>
                                <TableCell>{endereco.complemento}</TableCell>
                                <TableCell>{endereco.uf}</TableCell>
                                <TableCell>
                                    <Tooltip title="Editar" arrow>
                                        <IconButton aria-label="editar" onClick={() => onEditEndereco(endereco)} style={{ color: 'blue' }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir" arrow>
                                        <IconButton aria-label="excluir" onClick={() => onDeleteEndereco(endereco.endereco_id)} style={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={enderecos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListagemEndereco;
