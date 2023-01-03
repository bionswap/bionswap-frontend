import React from 'react'
import { 
    Box,
    Stack,
    styled,
    Pagination
} from '@mui/material'
import Card from 'components/Card';
import SkeletonCard from 'components/SkeletonCard';
import NoDataView from 'components/NoDataView';

interface CardProps {
    launchData: any
    page: number
    handleChangePagigation: (event: React.ChangeEvent<unknown>, value: number) => void
}

const LaunchpadCards = ({
    launchData,
    page,
    handleChangePagigation
}:CardProps) => {

  return (
    <>
        <Stack
            direction='row'
            flexWrap="wrap"
            alignItems='start'
            width='100%'
            sx={{
                gap:{ xs: '20px', lg: '40px'}
            }}
        >
            {launchData ? (
            launchData.data ? (
                launchData?.data?.map((item: any) => (
                <WrapItem key={item?.saleAddress}>
                    <Card data={item} />
                </WrapItem>
                ))
            ) : (
                <Box width="100%" height="40vh">
                  <NoDataView />
                </Box>
            )
            ) : (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
        </Stack>
        <Stack width='100%'>
            <Pagination
                count={launchData?.totalPages}
                page={page}
                onChange={handleChangePagigation}
                color="primary"
                variant='outlined'
                shape="rounded"
                size="large"
                showFirstButton showLastButton
            />
        </Stack>
    </>
  )
}

const WrapItem = styled(Box)`
  width: calc(100% / 3 - 30px);

  ${(props) => props.theme.breakpoints.down('lg')} {
    width: calc(100% / 3 - 14px);
  }

  ${(props) => props.theme.breakpoints.down('md')} {
    width: calc(100% / 2 - 10px);
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    width: 100%;
  }
  max-width: 395px;
`;

export default LaunchpadCards