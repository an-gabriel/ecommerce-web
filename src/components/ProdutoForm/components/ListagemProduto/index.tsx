import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../../../client/api'; // Importe o seu cliente de API aqui

interface ListagemProdutoProps {
    produtos: Produto[];
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
    onEditProduto: (produto: Produto) => void;
    onDeleteProduto: (produtoId: number) => void;
}

interface Produto {
    produto_id: number;
    nome_produto: string;
    descricao_produto: string;
    preco_produto: number;
    qtd_estoque: number;
    categoria_id: number;
    imagem: string;
    nome_categoria?: string;
    categoria: {
        categoria_id: number,
        nome_categoria: string
    }
}

const ListagemProduto: React.FC<ListagemProdutoProps> = ({
    produtos,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 5,
    onEditProduto,
    onDeleteProduto
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [categorias, setCategorias] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const promises = produtos.map(produto =>
                api.get(`/categorias/${produto.categoria.categoria_id}`)
            );

            const responses = await Promise.all(promises);

            const categoriasData: { [key: number]: string } = {};
            responses.forEach((response, index) => {
                const produto = produtos[index];
                categoriasData[produto.categoria.categoria_id] = response.data.nome_categoria;
            });

            setCategorias(categoriasData);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };


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
                            <TableCell>Preço</TableCell>
                            <TableCell>Estoque</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((produto) => {
                                return (
                                    <TableRow key={produto.produto_id}>
                                        <TableCell>{produto.produto_id}</TableCell>
                                        <TableCell>{produto.nome_produto}</TableCell>
                                        <TableCell>{produto.descricao_produto}</TableCell>
                                        <TableCell>{produto.preco_produto}</TableCell>
                                        <TableCell>{produto.qtd_estoque}</TableCell>
                                        <TableCell>{produto.categoria.nome_categoria}</TableCell>
                                        <TableCell>{produto.imagem}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Editar" arrow>
                                                <IconButton aria-label="editar" onClick={() => onEditProduto(produto)} style={{ color: 'blue' }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Excluir" arrow>
                                                <IconButton aria-label="excluir" onClick={() => onDeleteProduto(produto.produto_id)} style={{ color: 'red' }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={produtos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListagemProduto;
