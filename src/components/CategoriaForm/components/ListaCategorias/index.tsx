import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

interface Categoria {
    categoria_id: number;
    nome_categoria: string;
    descricao_categoria: string;
}

interface ListaCategoriasProps {
    categorias: Categoria[];
    currentPage: number;
}

const ListaCategorias: React.FC<ListaCategoriasProps> = ({ categorias, currentPage }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setPage(currentPage - 1);
    }, [currentPage]);

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
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((categoria) => (
                                <TableRow key={categoria.categoria_id}>
                                    <TableCell>{categoria.categoria_id}</TableCell>
                                    <TableCell>{categoria.nome_categoria}</TableCell>
                                    <TableCell>{categoria.descricao_categoria}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categorias.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListaCategorias;
