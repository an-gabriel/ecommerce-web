import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import api from '../../../../client/api';
import AdicionarCategoriaModal from '../AdicionarCategoriaModal';
import './style.css'

interface Categoria {
    categoria_id: number;
    nome_categoria: string;
    descricao_categoria: string;
}

interface ListaCategoriasProps {
    categorias: Categoria[];
    currentPage: number;
    onDeleteCategoria: (categoriaId: number) => void;
    onEditCategoria: (categoriaId: number, novoConteudo: Categoria) => void;
}

const ListaCategorias: React.FC<ListaCategoriasProps> = ({ categorias, currentPage, onDeleteCategoria, onEditCategoria }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalAberto, setModalAberto] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);
    const [novoNomeCategoria, setNovoNomeCategoria] = useState('');
    const [novaDescricaoCategoria, setNovaDescricaoCategoria] = useState('');

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

    const handleDeleteClick = (categoriaId: number) => {
        onDeleteCategoria(categoriaId);
    };

    const handleEditClick = (categoriaId: number) => {
        const categoria = categorias.find(c => c.categoria_id === categoriaId);
        if (categoria) {
            setCategoriaSelecionada(categoria);
            setNovoNomeCategoria(categoria.nome_categoria);
            setNovaDescricaoCategoria(categoria.descricao_categoria);
            setModalAberto(true);
        }
    };

    const handleCloseModal = () => {
        setModalAberto(false);
        setCategoriaSelecionada(null);
    };

    const handleConfirmarEdicao = () => {
        if (categoriaSelecionada) {
            const novoConteudo: Categoria = {
                ...categoriaSelecionada,
                nome_categoria: novoNomeCategoria,
                descricao_categoria: novaDescricaoCategoria,
            };
            onEditCategoria(categoriaSelecionada.categoria_id, novoConteudo);
            handleCloseModal();
        }
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
                            <TableCell>Ações</TableCell>
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
                                    <TableCell>
                                        <IconButton aria-label="editar" onClick={() => handleEditClick(categoria.categoria_id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="excluir" onClick={() => handleDeleteClick(categoria.categoria_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
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

            <Modal open={modalAberto} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Editar Categoria
                    </Typography>
                    <TextField
                        id="nomeCategoria"
                        name="nomeCategoria"
                        label="Nome"
                        value={novoNomeCategoria}
                        onChange={(e) => setNovoNomeCategoria(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="descricaoCategoria"
                        name="descricaoCategoria"
                        label="Descrição"
                        value={novaDescricaoCategoria}
                        onChange={(e) => setNovaDescricaoCategoria(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleConfirmarEdicao}>
                        Confirmar
                    </Button>
                    <Button variant="contained" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Box>
            </Modal>
        </Paper>
    );
};

export default ListaCategorias;
