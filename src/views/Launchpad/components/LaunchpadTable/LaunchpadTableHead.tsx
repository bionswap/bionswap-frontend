import React from 'react';
import { TableHead, TableSortLabel, Typography } from '@mui/material';
import { Data, HeadCell, LaunchpadTableProps } from './type';
import { StyledTableCell, StyledTableRow } from './Components/components';

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Project name',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'total_raised',
    numeric: true,
    disablePadding: false,
    label: 'Total raised',
  },
  {
    id: 'max_allocation',
    numeric: true,
    disablePadding: false,
    label: 'Max allocation',
  },
  {
    id: 'sale_price',
    numeric: true,
    disablePadding: false,
    label: 'Sale price',
  },
  {
    id: 'end_date',
    numeric: true,
    disablePadding: false,
    label: 'Ended in',
  },
];

const LaunchpadTableHead = (props: LaunchpadTableProps) => {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <StyledTableRow>
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
            <Typography color="text.secondary" fontWeight="500" fontSize="14px">
              {headCell.label}
            </Typography>
          </TableSortLabel>
        </StyledTableCell>
      ))}
    </StyledTableRow>
  );
};

export default LaunchpadTableHead;
