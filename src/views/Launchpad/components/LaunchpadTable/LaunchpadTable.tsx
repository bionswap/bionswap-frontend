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
  Pagination,
  Paper,
} from '@mui/material';
import Image from 'next/image';
import { formatUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useChain, useToken } from 'hooks';
import { NATIVE } from '@bionswap/core-sdk';
import { Data, Order, TableProps } from './type';
import LaunchpadTableHead from './LaunchpadTableHead';
import LaunchpadTableBody from './LaunchpadTableBody';

export default function LaunchpadTable({ launchData, page, handleChangePagigation }: TableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function StyledLabelDisplayedRows({ from, to, count }: any) {
    return (
      <Typography fontSize="14px" color="text.secondary" fontWeight="500">
        Showing {from} to {to} of {count !== -1 ? count : `more than ${to}`}
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <StyledTableWrapper>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              {launchData && (
                <LaunchpadTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={launchData?.data.length}
                />
              )}
            </TableHead>
            <TableBody>
              <LaunchpadTableBody
                launchpads={launchData?.data}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={launchData?.limit}
              />
            </TableBody>
          </Table>
        </TableContainer>
        {launchData && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={launchData?.totalDocs}
            rowsPerPage={launchData?.limit}
            page={page}
            onPageChange={handleChangePagigation}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={StyledLabelDisplayedRows}
            showFirstButton
            showLastButton
          />
        )}
      </StyledTableWrapper>
    </Box>
  );
}

const StyledTableWrapper = styled(Paper)`
  width: 100%;
  background-color: ${(props) => (props.theme.palette as any).extra.table.background};
  background-image: none;
  border-radius: 12px;
  // border: 1px solid ${(props) => (props.theme.palette as any).extra.table.divider};
  .MuiTablePagination-root {
    background-color: ${(props) => (props.theme.palette as any).extra.table.light};
    :last-child {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }
  .MuiTableBody-root .MuiTableRow-root {
    :hover {
      background-color: ${(props) => (props.theme.palette as any).extra.button.lighter};
      opacity: 0.8;
    }
  }
`;
