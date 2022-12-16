import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import Page from 'components/Page';
import ProjectCard from 'components/ProjectCard';
import { getSaleList } from 'api/launchpad';
import { useChain } from 'hooks';
import { ChainId } from '@bionswap/core-sdk';
import NotSupportSection from 'components/NotSupportSection';
import SkeletonCard from 'components/SkeletonCard';
import useMediaQuery from 'hooks/useMediaQuery';

const MyProject = () => {
  const {isMobile , isTablet} = useMediaQuery();
  const { account, chainId } = useChain();
  const [launchData, setLaunchData] = useState<any>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    chainId: chainId,
    owner: account,
    keyword: '',
    sortBy: null,
  });

  const getLaunchData = async () => {
    try {
      const launchData = await getSaleList(
        params.page,
        params.limit,
        params.chainId.toString(),
        params.owner || '',
        params.keyword,
        params.sortBy,
      );
      setLaunchData(launchData);
    } catch (error) {
      console.log('error====>', error);
    }
  };

  useEffect(() => {
    getLaunchData();
  }, [params]);

  return (
    <Wrapper>
      {ChainId.BSC_TESTNET === chainId ? (
        <Box sx={{
          display: 'flex', flexWrap: 'wrap',
          gap: { xs: '20px', lg: '40px' },
        }}>
          {launchData && launchData.data ? (
            launchData?.data?.map((item: any) => (
              <WrapItem key={item.title}>
                <ProjectCard data={item} />
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

export default MyProject;
