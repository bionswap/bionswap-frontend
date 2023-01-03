import { Stack, styled, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { StyledTableCell, StyledTableRow } from './Components/components';
import { getComparator, stableSort } from './hooks';
import { createData, Data, Order } from './type';
import { useToken } from 'hooks';
import { formatUnits } from 'ethers/lib/utils';
import LaunchpadTableRow from './LaunchpadTableRow';
import TableSkeleton from './TableSkeleton';

interface RowProps {
  launchpads: any;
  order: Order;
  orderBy: keyof Data;
  page: number;
  rowsPerPage: number;
}

const LaunchpadTableBody = ({ launchpads, order, orderBy, page, rowsPerPage }: RowProps) => {
  return (
    <>
      {launchpads ? (
        // stableSort(launchpads, getComparator(order, orderBy))
        launchpads.map((item: any) => {
          return <LaunchpadTableRow key="" item={item} />;
        })
      ) : (
        <TableSkeleton />
      )}
    </>
  );
};

export default LaunchpadTableBody;
