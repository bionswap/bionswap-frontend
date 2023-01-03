import { Box, Container, Stack, styled, Typography } from '@mui/material';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import Image from 'next/image';

const BoxItem = ({ data }: any) => {
  return (
    <Wrapbox>
      <Stack width="100%" flexDirection="row" gap="16px" height="100%">
        <Box
          sx={{
            position: 'relative',
            minWidth: '90px',
            aspectRatio: '1',
          }}
        >
          <Image src={data.logo} alt={data.logo} layout="fill" objectFit="contain" />
        </Box>
        <Stack width="100%" justifyContent="space-between" height="100%">
          <Stack flexDirection="row" width="100%">
            <Stack gap="4px" alignItems="flex-start" width="100%">
              <Typography variant="h6Poppins" fontWeight="600" lineHeight="30px" color="text.primary">
                {data.name}
              </Typography>
              <Typography variant="body4Poppins" fontWeight="400" lineHeight="180%" color="gray.400">
                {data.online} Online
              </Typography>
            </Stack>
            <PlayNow>
              <Typography variant="body4Poppins" color="primary.main">
                Play now
              </Typography>
            </PlayNow>
          </Stack>
          <Stack flexDirection="row" width="100%" justifyContent="space-between">
            <Stack alignItems="flex-start">
              <Typography variant="captionPoppins" fontWeight="400" color="gray.400" lineHeight="180%">
                Hourly Drop
              </Typography>
              <Stack flexDirection="row" width="100%" gap="6px">
                <Typography variant="body2Poppins" fontWeight="500" color="text.primary" lineHeight="27px">
                  {data.hourlyDrop}
                </Typography>
                <BionSwapToken>
                  <Image src="/images/BionSwapToken.svg" alt="BionSwapToken.svg" layout="fill" objectFit="contain" />
                </BionSwapToken>
              </Stack>
            </Stack>
            <VerticalLine />
            <Stack alignItems="flex-start">
              <Typography variant="captionPoppins" fontWeight="400" color="gray.400" lineHeight="180%">
                Daily Drop
              </Typography>
              <Stack flexDirection="row" width="100%" gap="6px">
                <Typography variant="body2Poppins" fontWeight="500" color="text.primary" lineHeight="27px">
                  {data.dailyDrop}
                </Typography>
                <BionSwapToken>
                  <Image src="/images/BionSwapToken.svg" alt="BionSwapToken.svg" layout="fill" objectFit="contain" />
                </BionSwapToken>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Wrapbox>
  );
};

const Wrapbox = styled(Stack)`
  border-radius: 12px;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  background-color: ${(props) => props.theme.palette.gray[800]};
  padding: 24px 24px 24px 5px;
  height: 180px;
  maxwidth: 418px;
`;
const PlayNow = styled(PrimaryLoadingButton)`
  background: rgba(7, 224, 224, 0.15);
  width: 110px;
  height: 40px;

  &:hover {
    background: rgba(7, 224, 224, 0.15);
    opacity: 0.9;
  }
`;
const BionSwapToken = styled(Box)`
  position: relative;
  min-width: 22px;
  aspect-ratio: 0.94/1;
`;
const VerticalLine = styled(Box)`
  height: 45px;
  width: 2px;
  background-color: ${(props) => props.theme.palette.gray[700]};
`;

export default BoxItem;
