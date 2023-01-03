import * as React from 'react';
import { alpha } from '@mui/material/styles';
import {
  Stack,
  styled,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper
} from '@mui/material'
import Image from 'next/image';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: (theme.palette as any).extra.card.light,
    color: theme.palette.text.primary,
    '&:first-child, &:first-child': {
      borderTopLeftRadius: '8px',
    },
    '&:last-child, &:last-child': {
      borderTopRightRadius: '8px',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: (theme.palette as any).extra.card.light,
  },
  'td, th': {
    border: 0,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'TVL',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Volumn (24h)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Fees (24h)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'APR',
  },
];

interface FarmTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function FarmTableHead(props: FarmTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell
          align='left'
        >
          <Typography color='text.secondary' fontWeight='500' fontSize='14px'>
            #
          </Typography>
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography color='text.secondary' fontWeight='500' fontSize='14px'>
                {headCell.label}
              </Typography>
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}


export default function FarmTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function StyledLabelDisplayedRows({ from, to, count }:any) { 
    return (
      <Typography fontSize='14px' color='text.secondary' fontWeight='500'>
        Showing {from} to {to} of {count !== -1 ? count : `more than ${to}`}
      </Typography>
    ); 
  }

  return (
    <Box sx={{ width: '100%' }}>
      <StyledTableWrapper>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
          >
            <FarmTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <StyledTableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={row.name}
                    >
                      <StyledTableCell>
                        <Typography fontSize='14px' color='text.secondary' fontWeight='500'>
                          #{index+1}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                      >
                        <Stack direction='row' justifyContent='start' spacing={1}>
                          <Stack direction='row' justifyContent='start'>
                            <TokenImageBox>
                              <Image src='/images/coins/sushi.jpg' alt='' width={26} height={26} />
                            </TokenImageBox>
                            <TokenImageBox
                              sx={{
                                marginLeft: '-17.5%'
                              }}
                            >
                              <Image src='/images/coins/usdc.jpg' alt='' width={26} height={26} />
                            </TokenImageBox>
                          </Stack>
                          <Stack alignItems='start'>
                            <Typography fontSize='14px' fontWeight='500'>
                              {row.name}
                            </Typography>
                            <Typography fontSize='10px' color='text.secondary'>
                              Classic
                            </Typography>
                          </Stack>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                      <StyledTableCell align="right">{row.protein}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={StyledLabelDisplayedRows}
        />
      </StyledTableWrapper>
    </Box>
  );
}

const StyledTableWrapper = styled(Paper)`
  width: 100%;
  background-color: ${props => (props.theme.palette as any).extra.card.background};
  background-image: none;
  border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  border-radius: 8px;
  box-shadow: none;
  .MuiTablePagination-root {
    background-color: ${props => (props.theme.palette as any).extra.card.light};
    :last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .MuiTableBody-root .MuiTableRow-root {
    :hover {
      background-color: ${props => (props.theme.palette as any).extra.button.lighter};
      opacity: .8;
    }
  }
`
const TokenImageBox = styled(Stack)`
  img {
    border-radius: 50%;
  }
  box-shadow: 0 0 0 0 #fff, 0 0 0 1px rgba(0,0,0,.5), 0 1px 2px 0 #000,0 0 #000;
  border-radius: 50%;
`