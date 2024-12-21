import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  useTheme,
  Tooltip,
  LinearProgress,
  Checkbox,
  TableFooter,
  TablePagination,
} from '@mui/material';
import {
  PlagiarismOutlined as PlagiarismOutlinedIcon,
} from '@mui/icons-material';
import { TableComponentProps } from './TableComponentTypes';
import { FilePenLine, ShieldAlert } from 'lucide-react';

const TableComponent: React.FC<TableComponentProps> = ({
  headers,
  data,
  handlerEditarAction,
  handlerDelete,
  labelCaption,
  loading,
  handlerDetalhesAction,
  handlerDeletarAction,
  ActionSelect,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allSelectedIds = data.map((row) => row.id); // Seleciona todos os IDs
      setSelected(allSelectedIds);
    } else {
      setSelected([]); // Limpa a seleção
    }
  };

  const handleSelectRow = (event: React.ChangeEvent<HTMLInputElement>, rowId: string) => {
    if (event.target.checked) {
      setSelected((prev) => [...prev, rowId]);
    } else {
      setSelected((prev) => prev.filter((id) => id !== rowId));
    }
  };

  const handleRowClick = (rowId: string) => {
    if (selected.includes(rowId)) {
      setSelected((prev) => prev.filter((id) => id !== rowId));
    } else {
      setSelected((prev) => [...prev, rowId]);
    }
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - data.length);

  return (
    <Box
      component={Paper}
      elevation={5}
      padding={1}
      sx={{ width: '100%', bgcolor: theme.palette.background.paper }}
    >
      <TableContainer sx={{ bgcolor: theme.palette.background.paper }}>
        <Table sx={{ minWidth: 300, border: 'none' }} aria-label="pagination table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {headers.map((header) => (
                <TableCell key={header.id} sx={{ color: theme.palette.primary.contrastText }}>
                  {header.label}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ color: theme.palette.primary.contrastText }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 2}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={headers.length + 2}
                  sx={{ textAlign: 'center', color: theme.palette.primary.contrastText }}
                >
                  <PlagiarismOutlinedIcon />
                  {labelCaption}
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: selected.includes(row.id)
                        ? theme.palette.action.selected
                        : 'inherit',
                    }}
                    onClick={() => handleRowClick(row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={(event) => handleSelectRow(event, row.id)}
                      />
                    </TableCell>
                    {headers.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handlerEditarAction(row.id)}>
                          <FilePenLine  style={{color:"#cddc39"}}/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Iniativar?">
                        <IconButton onClick={() => handlerDeletarAction && handlerDeletarAction(row.id)}>
                          <ShieldAlert style={{color:"red"}}/>
                        </IconButton>
                      </Tooltip>
                      {handlerDetalhesAction && (
                        <Tooltip title="Detalhes">
                          <IconButton onClick={() => handlerDetalhesAction(row.id)}>
                            <PlagiarismOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {ActionSelect && <ActionSelect />}
                    </TableCell>
                  </TableRow>
                ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={headers.length + 2} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={headers.length + 2}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
