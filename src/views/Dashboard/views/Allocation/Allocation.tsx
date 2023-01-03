import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import Page from 'components/Page';
import AllocationCard from 'components/AllocationCard';
import { useChain } from 'hooks';
import { getJoinedSales } from 'api/launchpad';
import NotSupportSection from 'components/NotSupportSection';
import { ChainId } from '@bionswap/core-sdk';
import SkeletonCard from 'components/SkeletonCard';
import useMediaQuery from 'hooks/useMediaQuery';

const Allocation = () => {
  const { account, chainId } = useChain();
  const {isMobile , isTablet} = useMediaQuery();
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const getDataCliam = async () => {
      try {
        const res = await getJoinedSales(chainId.toString(), account || '');
        setData(res);
      } catch (error) {
        console.log('error===>', error);
      }
    };

    getDataCliam();
  }, [chainId, account]);

  return (
    <Wrapper>
      {ChainId.BSC_TESTNET === chainId ? (
        <Box sx={{
          display: 'flex', flexWrap: 'wrap',
          gap: { xs: '20px', lg: '40px' },
        }}>
          {data && data.length && account ? (
            data?.map((item: any) => (
              <WrapItem key={item.saleAddress}>
                <AllocationCard data={item} account={account || ''} />
              </WrapItem>
            ))
          ) : (
            <SkeletonCard />
          )}
        </Box>
      ) : (
        <NotSupportSection />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
`;
const Item = styled(Box)`
  max-width: 433px;
  width: 100%;
`;
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
`;
const Grid = styled(Box)`
  display: grid;
  justify-content: space-between;
`;


export default Allocation;
