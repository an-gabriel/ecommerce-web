import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material';

export interface PedidoProduto {
    produto_pedido_id: number;
    qtd_produto_pedido: number;
    preco_produto_pedido: number;
    produto_id: number;
    pedido_id?: number;
}

interface PedidoProdutoGridProps {
    produtosPedido: PedidoProduto[];
}

const PedidoProdutoGrid: React.FC<PedidoProdutoGridProps> = ({ produtosPedido }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                            <TableCell>Pedido ID</TableCell>
                            <TableCell>Produto ID</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Preço Unitário</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? produtosPedido.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : produtosPedido
                        ).map((produtoPedido) => (
                            <TableRow key={produtoPedido.produto_pedido_id}>
                                <TableCell>{produtoPedido.pedido_id || '-'}</TableCell>
                                <TableCell>{produtoPedido.produto_id}</TableCell>
                                <TableCell>{produtoPedido.produto_pedido_id}</TableCell>
                                <TableCell>{produtoPedido.qtd_produto_pedido}</TableCell>
                                <TableCell>{produtoPedido.preco_produto_pedido}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={produtosPedido.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PedidoProdutoGrid;
