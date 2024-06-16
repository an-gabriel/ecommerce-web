import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import api from '../../../../client/api'; // Importe o seu cliente de API aqui

interface ListagemProdutoProps {
    produtos: Produto[];
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
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
        descricao_categoria: string
    }
}

const ListagemProduto: React.FC<ListagemProdutoProps> = ({ produtos, rowsPerPageOptions = [5, 10, 25], defaultRowsPerPage = 5 }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [categorias, setCategorias] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const categoriasData: { [key: number]: string } = {};
            for (const produto of produtos) {

                const response = await api.get(`/categorias/${produto.categoria.categoria_id}`);
                categoriasData[produto.categoria_id] = response.data.nome_categoria;
            }
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((produto) => {
                                console.log(`Renderizando produto com ID ${produto.produto_id}`);
                                return (
                                    <TableRow key={produto.produto_id}>
                                        <TableCell>{produto.produto_id}</TableCell>
                                        <TableCell>{produto.nome_produto}</TableCell>
                                        <TableCell>{produto.descricao_produto}</TableCell>
                                        <TableCell>{produto.preco_produto}</TableCell>
                                        <TableCell>{produto.qtd_estoque}</TableCell>
                                        <TableCell>{categorias[produto.categoria_id]}</TableCell>
                                        <TableCell>{produto.imagem}</TableCell>
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
