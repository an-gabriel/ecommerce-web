import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Modal, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../../../client/api';
import AdicionarCategoriaModal from '../AdicionarCategoriaModal';
import './style.css';

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
            setModalAberto(true);
        }
    };

    const handleCloseModal = () => {
        setModalAberto(false);
        setCategoriaSelecionada(null);
    };

    const adicionarCategoria = async (novaCategoria: Categoria): Promise<void> => {
        try {
            if (categoriaSelecionada) {
                const novoConteudo: Categoria = {
                    ...categoriaSelecionada,
                    nome_categoria: novaCategoria.nome_categoria,
                    descricao_categoria: novaCategoria.descricao_categoria,
                };
                await api.put(`/categorias/${categoriaSelecionada.categoria_id}`, novoConteudo);

                onEditCategoria(categoriaSelecionada.categoria_id, novoConteudo);
                handleCloseModal();
            } else {
                const response = await api.post('/categorias', novaCategoria);
                onEditCategoria(response.data.categoria_id, response.data);
                handleCloseModal();
            }
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
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

            {categoriaSelecionada !== null && (
                <AdicionarCategoriaModal
                    open={modalAberto}
                    onClose={handleCloseModal}
                    onCategoriaAdded={adicionarCategoria}
                    categoriaInicial={categoriaSelecionada}
                />
            )}
        </Paper>
    );
};

export default ListaCategorias;
