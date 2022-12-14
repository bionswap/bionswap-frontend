import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import Page from 'components/Page';
import ProjectCard from 'components/ProjectCard';
import { getSaleList } from 'api/launchpad';
import { useChain } from 'hooks';
import { ChainId } from '@bionswap/core-sdk';
import NotSupportSection from 'components/NotSupportSection';
import SkeletonCard from 'components/SkeletonCard';

const MyProject = () => {
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
    <Page>
      <Wrapper>
        <Box mb="50px">
          <Typography variant="h3Samsung">My Projects</Typography>
        </Box>
        {ChainId.BSC_TESTNET === chainId ? (
          <FlexBox gap="30px" flexWrap="wrap">
            {launchData && launchData.data ? (
              launchData?.data?.map((item: any) => (
                <Item key={item.title}>
                  <ProjectCard data={item} />
                </Item>
              ))
            ) : (
              <SkeletonCard />
            )}
          </FlexBox>
        ) : (
          <NotSupportSection />
        )}
      </Wrapper>
    </Page>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  padding: 30px 40px;
`;
const Item = styled(Box)`
  max-width: 423px;
`;
const FlexBox = styled(Box)`
  display: flex;
`;

export default MyProject;
