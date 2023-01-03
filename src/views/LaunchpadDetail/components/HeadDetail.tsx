import * as React from 'react';
import { Box, Link, Breadcrumbs, Typography, Stack } from '@mui/material';
import styled from '@emotion/styled';
import useMediaQuery from 'hooks/useMediaQuery';

interface HeadDetailProps {
  avatar: string;
  name: string;
  type: any;
  endTime: number;
  startTime: number;
  unit?: string;
  isWhitelistEnabled?: boolean;
}

const HeadDetail: React.FC<HeadDetailProps> = ({
  avatar,
  name,
  type,
  endTime,
  startTime,
  unit,
  isWhitelistEnabled,
}) => {
  const currentTime = +new Date();

  const {isMobile} = useMediaQuery()

  return (
    <Stack direction={isMobile ? 'column' : 'row'} alignItems='start' spacing={2} justifyContent='space-between' width='100%'>
      <Stack direction={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'start' : 'center'} spacing={3}>
        <Logo>
          <Box component="img" src={avatar} alt={name} />
        </Logo>
        <FlexBox flexDirection="column">
          <FlexBox
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'start', md: 'center' },
              gap: { xs: '5px', md: '20px' },
            }}
          >
            <Typography fontSize='36px' color="text.primary" fontWeight="700" lineHeight='1.2'>
              {name}
            </Typography>
            {/* <FlexBox gap="15px">
              <FlexBox gap="8px" alignItems="center">
                <Box component="img" src={`/icons/coins/${unit}.svg`} alt={unit} width="24px" />
                <Typography variant="body3Poppins" fontWeight="600" color="gray.200">
                  {unit}
                </Typography>
              </FlexBox>
            </FlexBox> */}
          </FlexBox>
          <Typography variant="body2Poppins" color="#9B9B9B" fontWeight="400">
            {type}
          </Typography>
        </FlexBox>
      </Stack>
      <Box display="flex" alignItems="center" gap="15px">
        <Status
          sx={{
            backgroundColor: theme => (theme.palette as any).extra.button.backgroundGreenOpacity,
            color: 'primary.main',
            border: '1px solid transparent',
            ...(currentTime > startTime && {
              backgroundColor: 'success.main',
              color: 'white',
            }),
            ...(currentTime > endTime && {
              backgroundColor: theme => (theme.palette as any).extra.card.hover,
              color: 'text.secondary',
            }),
          }}
        >
          <Typography sx={{
            color: 'inherit',
            fontWeight: '500',
            fontSize: '16px',
          }}>
            {currentTime < startTime ? 'Coming Soon' : currentTime < endTime ? 'Sale Open' : 'Sale Closed'}
          </Typography>
        </Status>
        {isWhitelistEnabled && (
          <Status
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: 'success.main',
              color: 'success.main'
            }}
          >
            <Typography sx={{
              color: 'inherit',
              fontWeight: '500',
              fontSize: '16px',
            }}>
              Whitelisted
            </Typography>
          </Status>
        )}
      </Box>
    </Stack>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Status = styled(Box)`
  padding: 8px 25px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;
const Logo = styled(Box)`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default HeadDetail;
