import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';

interface Data {
  id: string;
  player: string;
  netWin: string;
  winRate: string;
  roundWon: string;
  roundPlayed: string;
}

function createData(
  id: string,
  player: string,
  netWin: string,
  winRate: string,
  roundWon: string,
  roundPlayed: string,
): Data {
  return {
    id,
    player,
    netWin,
    winRate,
    roundWon,
    roundPlayed,
  };
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    label: '#',
  },
  {
    id: 'player',
    label: 'Player',
  },
  {
    id: 'netWin',
    label: 'Net Winning',
  },
  {
    id: 'winRate',
    label: 'Win Rate',
  },
  {
    id: 'roundWon',
    label: 'Rounds Won',
  },
  {
    id: 'roundPlayed',
    label: 'Rounds Played',
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.id === 'player' ? 'left' : 'center'}>
            <Typography
              variant="body4Poppins"
              lineHeight="180%"
              fontWeight="500"
              color="blue.400"
              textTransform="uppercase"
            >
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const LeaderboardTable = ({ data }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = [
    createData('1', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('2', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('3', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('4', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('5', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('6', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('7', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('8', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('9', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('10', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('11', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('12', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('13', 'User1234', '30.000', '52.49', '11,362', '21,727'),
    createData('14', 'User1234', '30.000', '52.49', '11,362', '21,727'),
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, backgroundColor: '#0C1620' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell align="center">
                      {row.id !== '1' && row.id !== '2' && row.id !== '3' ? (
                        <Typography variant="body3Poppins" fontWeight="600" lineHeight="180%" color="blue.400">
                          {row.id}
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            width: '27px',
                            aspectRatio: '1/0.68',
                            position: 'relative',
                            margin: 'auto'
                          }}
                        >
                          {row.id === '1' ? (
                            <Image src="/images/RankGold.svg" alt="RankGold.svg" layout="fill" objectFit="contain" />
                          ) : row.id === '2' ? (
                            <Image src="/images/RankSilver.svg" alt="RankGold.svg" layout="fill" objectFit="contain" />
                          ) : (
                            <Image src="/images/RankCopper.svg" alt="RankGold.svg" layout="fill" objectFit="contain" />
                          )}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <Stack flexDirection="row" gap="8px" justifyContent="flex-start">
                        <Box
                          sx={{
                            width: '25px',
                            aspectRatio: '1',
                            position: 'relative',
                          }}
                        >
                          <Image src="/images/Avatar.svg" alt="Avatar.svg" layout="fill" objectFit="contain" />
                        </Box>
                        <Typography variant="body3Poppins" fontWeight="600" lineHeight="180%" color="primary.main">
                          {row.player}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body3Poppins" fontWeight="600" lineHeight="180%" color="success.main">
                        + {row.netWin}$
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body3Poppins" fontWeight="400" lineHeight="180%" color="gray.300">
                        {row.winRate}%
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body3Poppins" fontWeight="400" lineHeight="180%" color="gray.300">
                        {row.roundWon}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body3Poppins" fontWeight="400" lineHeight="180%" color="gray.300">
                        {row.roundPlayed}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default LeaderboardTable;
