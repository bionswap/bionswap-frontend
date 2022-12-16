import * as React from 'react';
import { Box, Breadcrumbs, Typography, styled, Stack } from '@mui/material';
import Link from 'next/link';
import {BsChevronRight} from 'react-icons/bs'

function handleClick(event: any) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

interface BreadcrumbProps {
  name: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ name }) => {
  return (
    <Box marginBottom="17px">
      <Stack direction='row' spacing={1}>
        <Box sx={{ cursor: 'pointer' }}>
          <Link href="/launchpad">
            <Typography fontSize='14px' color="text.secondary">
              Projects
            </Typography>
          </Link>
        </Box>
        <BsChevronRight/>
        <Typography fontSize='14px' color="text.primary" fontWeight="500">
          {name}
        </Typography>
      </Stack>
    </Box>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;

export default Breadcrumb;
