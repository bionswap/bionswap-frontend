import { Stack , Skeleton } from '@mui/material'
import React from 'react'
import { StyledTableCell, StyledTableRow } from './Components/components'

const TableSkeleton = () => {
  return (
    <StyledTableRow
        // hover
        // onClick={(event) => handleClick(event, row.name)}
    >
        <StyledTableCell component="th" scope="row">
        <Stack direction="row" justifyContent="start" spacing={2}>
            <Skeleton variant='circular' width='50px' height='50px'/>
            <Stack alignItems="start">
                <Skeleton width='120px' height='25px' />
                <Skeleton width='80px' height='25px' />
            </Stack>
        </Stack>
        </StyledTableCell>
        <StyledTableCell align="right">
            <Skeleton width='120px' height='25px'/>
        </StyledTableCell>
        <StyledTableCell align="right">
            <Skeleton width='120px' height='25px'/>
        </StyledTableCell>
        <StyledTableCell align="right">
            <Skeleton width='120px' height='25px'/>
        </StyledTableCell>
        <StyledTableCell align="right">
            <Skeleton width='120px' height='25px'/>
        </StyledTableCell>
        <StyledTableCell align="right">
        <Stack alignItems='end' spacing={1}>
            <Skeleton width='160px' height='25px'/>
            <Skeleton width='80px' height='25px'/>
        </Stack>
        
        </StyledTableCell>
    </StyledTableRow>
  )
}

export default TableSkeleton