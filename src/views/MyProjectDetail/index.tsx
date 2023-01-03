import {
  Box,
  Container,
  Typography,
  linearProgressClasses,
  LinearProgress,
  styled,
  Button,
  Tabs,
  Tab,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/router';
import { getSaleDetail } from 'api/launchpad';
import { useEffect, useState } from 'react';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS, NATIVE } from '@bionswap/core-sdk';
import { useToken } from 'hooks/useToken';
import { isAddress } from 'utils/validate';
import { useBionLockContract, usePresaleContract } from 'hooks/useContract';
import { useChain, useSingleCallResult } from 'hooks';
import { useTotalSupply } from 'hooks/useTotalSupply';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import CountDownTime from './CountDownTime';
import CountDownUnlockLP from './CountDownUnlockLP';
import { withCatch } from 'utils/error';
import ListContributorModal from 'components/ListContributorModal';
import Page from 'components/Page';
import useMediaQuery from 'hooks/useMediaQuery';
import { shortenAddress } from 'utils/format';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: (theme.palette as any).extra.card.light,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'success.main',
  },
}));

const saleTypes = [
  {
    value: false,
    label: 'Public',
  },
  {
    value: true,
    label: 'Whitelist',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyProjectDetail = () => {
  const {isMobile , isTablet} = useMediaQuery()
  const [unlockLPLoading, setUnlockLPLoading] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);
  const [data, setData] = useState<any>(null);
  const quoteERCToken = useToken(data?.quoteToken);
  const { account, chainId } = useChain();
  const router = useRouter();
  const { slug } = router.query;
  const token = useToken(data?.token);
  const [decimals, setDecimals] = useState(18);
  const hardCap = formatUnits(data?.hardCap || 0, decimals);
  const lockLPDuration = Math.floor(data?.lockLPDuration / (3600 * 24));
  const price = formatUnits(data?.price || 0, decimals);
  const listingPrice = formatUnits(data?.listingPrice || 0, decimals);
  const minBuy = formatUnits(data?.minPurchase || 0, decimals);
  const maxBuy = formatUnits(data?.maxPurchase || 0, decimals);
  const presaleContract = usePresaleContract(data?.saleAddress);
  const bionLockContract = useBionLockContract();
  const saleStatus = useSingleCallResult(presaleContract, 'status')?.result?.[0] || 0;
  const isWhitelistEnabled = useSingleCallResult(presaleContract, 'isWhitelistEnabled')?.result?.[0] || false;
  const purchaserList = useSingleCallResult(presaleContract, 'getAllPurchasers', [])?.result?.[0] || [];

  const lockId = useSingleCallResult(presaleContract, 'lockId')?.result?.[0]?.toNumber() || 0;
  const lockRecord = useSingleCallResult(bionLockContract, 'getLockById', [lockId])?.result?.[0];
  const tgeDate = Number(lockRecord?.tgeDate) * 1000;

  const withdrawableTokens = useSingleCallResult(bionLockContract, 'withdrawableTokens', [lockId])?.result?.[0];

  const currentCap = formatUnits(
    useSingleCallResult(presaleContract, 'currentCap')?.result?.[0] || 0,
    decimals,
  );
  const totalSupply = useTotalSupply(token || undefined)?.toExact({});
  const tokensForPresale = Number(hardCap) / Number(price);
  const tokensForLP = (Number(hardCap) * (data?.lpPercent / 100)) / Number(listingPrice);
  const quoteNativeToken = NATIVE[chainId];
  const quoteToken = data?.isQuoteETH ? quoteNativeToken : quoteERCToken;
  const unit = quoteToken?.symbol;

  const currentTime = +new Date();
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;
  const linearProgress = (Number(currentCap) * 100) / Number(hardCap);
  const [value, setValue] = useState(0);

  const handleListModal = () => {
    setOpenListModal(!openListModal);
  };

  useEffect(() => {
    const handleCheckDecimal = () => {
      if (data?.isQuoteETH) {
        setDecimals(18);
      } else {
        setDecimals(quoteERCToken?.decimals || 9);
      }
    };

    handleCheckDecimal();
  }, [quoteERCToken, data]);

  const fetchSaleDetail = async (saleAddress?: any) => {
    if (!isAddress(saleAddress)) return;

    try {
      const res = await getSaleDetail(saleAddress);
      setData(res);
    } catch (error) {
      console.log('error==>', error);
    }
  };

  useEffect(() => {
    fetchSaleDetail(slug);
  }, [slug]);

  const contributorData = [
    {
      label: 'Contributors',
      value: `${purchaserList.length}`,
    },
    {
      label: 'Raised',
      value: `${currentCap} ${unit}`,
    },
    {
      label: 'Days left',
      value: 0,
    },
  ];

  const dataConfig = [
    {
      title: 'Token Sale',
      tabs: [
        {
          label: 'Token',
          items: [
            {
              label: 'Name',
              value: token?.name,
            },
            {
              label: 'Symbol',
              value: token?.symbol,
            },
            {
              label: 'Token Address',
              value: shortenAddress(token?.address ?? ''),
            },
            {
              label: 'Total Supply',
              value: `${totalSupply} ${token?.symbol}`,
            },
            {
              label: 'Tokens For Presale',
              value: `${tokensForPresale.toLocaleString()} ${token?.symbol}`,
            },
            {
              label: 'Tokens For Liquidity',
              value: `${tokensForLP.toLocaleString()} ${token?.symbol}`,
            },
            {
              label: 'Standard',
              value: 'BEP20',
            },
          ],
        },
        {
          label: 'Presale',
          items: [
            {
              label: 'Price per token',
              value: `${price} ${unit}`,
            },
            {
              label: 'Minimum buy',
              value: `${minBuy} ${unit}`,
            },
            {
              label: 'Maximum buy',
              value: `${maxBuy} ${unit}`,
            },
            {
              label: 'Network',
              value: 'Binance Smart Chain',
            },
            {
              label: 'Start time',
              value: `${new Date(startTime).toLocaleString()}`,
            },
            {
              label: 'End time',
              value: `${new Date(endTime).toLocaleString()}`,
            },
          ],
        },
      ],
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleFinalize = async () => {
    if (!presaleContract || !account) return;

    if (data?.isQuoteETH) {
      const tx = await presaleContract.finalizeInETH();
      await tx.wait();
    } else {
      const tx = await presaleContract.finalize();
      await tx.wait();
    }
  };

  const handleCancel = async () => {
    if (!presaleContract || !account) return;
    const tx = await presaleContract.cancelSale();
    await tx.wait();
  };

  const handleChangeSaleMode = async (isWhitelistEnabled: boolean) => {
    if (!presaleContract || !account) return;

    const tx = await presaleContract.setWhitelistEnabled(isWhitelistEnabled);
    await tx.wait();
  };

  const handleUnlockLP = async () => {
    try {
      if (!bionLockContract || !account) return;
      setUnlockLPLoading(true);
      const { error, result: tx } = await withCatch<any>(bionLockContract?.unlock(lockId));
      const receipt = await tx.wait();
      setUnlockLPLoading(false);
    } catch (error: any) {
      setUnlockLPLoading(false);
      console.log('error===>', error);
    }
  };

  const handleSelectWhitelist = () => {
    handleChangeSaleMode(!isWhitelistEnabled);
  };

  return (
    <Page sx={{backgroundColor: theme => (theme.palette as any).extra.background.alt}}>
      <HeadArea>
        <WrapContain maxWidth='xl'>
          <FlexBox gap="10px" alignItems="center">
            <Typography variant="h3Samsung" color="text.primary" fontWeight="700">
              {data?.title}
            </Typography>
            <Status
              sx={{
                backgroundColor: 'gray.500',
                ...(currentTime < startTime && {
                  backgroundColor: 'gray.800',
                }),
                ...(currentTime < endTime && {
                  backgroundColor: 'success.main',
                }),
              }}
            >
              <Typography
                variant="captionPoppins"
                sx={{
                  color: 'text.primary',
                  fontWeight: '500',
                }}
              >
                {currentTime < startTime ? 'Coming Soon' : currentTime < endTime ? 'Sale Open' : 'Sale Closed'}
              </Typography>
            </Status>
          </FlexBox>
          <Typography variant="body2Poppins" color="gray.400" fontWeight="400">
            The next level decentralized
          </Typography>
          {/* <FlexBox gap="16px" mt="24px">
            <ViewProject>
              <img src="/icons/symbols/remove_red_eye.svg" alt="remove_red_eye" />
              <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                View project
              </Typography>
            </ViewProject>
            <EditInfo>
              <img src="/icons/symbols/edit.svg" alt="edit" />
              <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                Edit information
              </Typography>
            </EditInfo>
          </FlexBox> */}
        </WrapContain>
      </HeadArea>
      <BodyArea>
        <Container maxWidth='xl'>
          <Box mb='20px'>
            <Typography fontSize='24px' color="text.primary" fontWeight="600">
              Sale Progress
            </Typography>
          </Box>
          <FlexBox
            gap="44px"
            sx={{
              flexDirection: isTablet ? 'column' : 'row'
            }}
          >
            <InforBox
              sx={{
                width: isTablet ? '100%' : '65%'
              }}
            >
              <ProgressBox>
                <FlexBox
                  gap={isMobile ? '20px' : "60px"}
                  sx={{
                    flexDirection: isMobile ? 'column' : 'row'
                  }}
                >
                  {contributorData.map((item, index) => (
                    <>
                      {item.label === 'Days left' ? (
                        <CountDownTime endTime={endTime} />
                      ) : (
                        <FlexBox flexDirection="column" gap="5px">
                          <Typography variant="captionPoppins" color="gray.400" fontWeight="400">
                            {item.label}
                          </Typography>
                          <Typography variant="h6Poppins" color="text.primary" fontWeight="500">
                            {item.value}
                          </Typography>
                        </FlexBox>
                      )}
                    </>
                  ))}
                </FlexBox>
                <FlexBox flexDirection="column" gap="10px">
                  <BorderLinearProgress variant="determinate" value={linearProgress} sx={{ width: '100%' }} />
                  <FlexBox justifyContent="space-between" p='0 5px'>
                    <Typography fontSize='14px' color="success.main" fontWeight="500">
                      {linearProgress}%
                    </Typography>
                    <Typography fontSize='14px' color="success.main" fontWeight="500">
                      {currentCap} {unit}{' '}
                      <Typography fontSize='14px' color="text.primary" fontWeight="500">
                        /{' '}{hardCap} {unit}
                      </Typography>
                    </Typography>
                  </FlexBox>
                </FlexBox>
              </ProgressBox>
              <Box 
                sx={{ 
                  width: '100%', marginTop: '44px'
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {dataConfig.map((item, index) => (
                      <Tab key={item.title} label={item.title} {...a11yProps(index)} />
                    ))}
                  </StyledTabs>
                </Box>
                {dataConfig.map((item, index) => (
                  <TabPanelCustom key={item.title + index} value={value} index={index}>
                    {item.tabs.map((i, j) => (
                      <Stack key='' justifyContent='start' alignItems='start' p='16px' width='100%' spacing={2}>
                        <Typography fontSize='18px' color="text.primary" fontWeight="500">
                          {i.label}
                        </Typography>
                        <Stack justifyContent='start' alignItems='start' width='100%' spacing={1}>
                          {i.items.map((a, b) => (
                            <Stack key={a.label} direction='row' alignItems='start' justifyContent="space-between" width='100%'>
                              <Typography fontSize='14px' color="text.secondary">
                                {a.label}
                              </Typography>
                              <Typography fontSize='14px' color="text.primary" fontWeight="500">
                                {a.value}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    ))}
                  </TabPanelCustom>
                ))}
              </Box>
            </InforBox>
            <ActiveBox
              sx={{
                width: isTablet ? '100%' : '35%'
              }}
            >
              <SaleBox gap="18px">
                <Typography variant="body2Poppins" color="gray.50" fontWeight="500">
                  Sale action
                </Typography>
                <FlexBox gap="15px" flexDirection="column">
                  <ButtonInLine
                    variant='contained'
                    onClick={handleFinalize}
                    disabled={saleStatus !== 0 || currentTime < endTime}
                  >
                    <Typography variant="body3Poppins" color="inherit" fontWeight="500">
                      Complete and Release token
                    </Typography>
                  </ButtonInLine>
                  <ButtonInLine
                    variant='contained'
                    onClick={handleCancel}
                    color='error'
                    disabled={saleStatus !== 0 || currentTime < endTime}
                  >
                    <Typography variant="body3Poppins" color="inherit" fontWeight="500">
                      Cancel
                    </Typography>
                  </ButtonInLine>
                  <ButtonOutLine
                    variant='outlined'
                    onClick={handleListModal}
                    color='success'
                  >
                    <Typography variant="body3Poppins" color="inherit">
                      Contributors list
                    </Typography>
                  </ButtonOutLine>
                </FlexBox>
              </SaleBox>
              <SaleBox gap="18px">
                <Typography variant="body2Poppins" color="gray.50" fontWeight="500">
                  Sale Mode
                </Typography>
                <FormControl fullWidth>
                  <RadioGroup name="radio-buttons-group" value={isWhitelistEnabled} onChange={handleSelectWhitelist}>
                    {saleTypes?.map((item) => (
                      <FormControlLabel
                        key={item.label}
                        value={item.value}
                        label={
                          <Typography
                            variant="body3Poppins"
                            color={isWhitelistEnabled === item.value ? 'gray.300' : 'gray.700'}
                            fontWeight="400"
                          >
                            {item.label}
                          </Typography>
                        }
                        control={
                          <Radio
                            sx={{
                              color: 'text.disabled',
                              '&.Mui-checked': {
                                color: 'primary.main',
                              },
                            }}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </SaleBox>
              {data?.isAutoListing && (
                <SaleBox gap="18px">
                  <Typography variant="body2Poppins" color="text.secondary" fontWeight="500">
                    Liquidity
                  </Typography>
                  {tgeDate ? (
                    <FlexBox gap="15px" flexDirection="column">
                      <CountDownUnlockLP endTime={tgeDate} />
                      {currentTime >= tgeDate && withdrawableTokens == 0 ? (
                        <Typography variant="body3Poppins" color="primary.main" fontWeight="600" textAlign="center">
                          Project has unlocked
                        </Typography>
                      ) : (
                        <ButtonOutLine
                          variant='outlined'
                          disabled={currentTime <= tgeDate || unlockLPLoading}
                          onClick={handleUnlockLP}
                        >
                          <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                            {unlockLPLoading ? 'Loading.....' : 'Unlock LP'}
                          </Typography>
                        </ButtonOutLine>
                      )}
                    </FlexBox>
                  ) : (
                    <Box>
                      <Typography>
                        Your liquidity will be locked {lockLPDuration} {lockLPDuration > 1 ? 'days' : 'day'} after sale
                        finalize
                      </Typography>
                    </Box>
                  )}
                </SaleBox>
              )}
            </ActiveBox>
          </FlexBox>
        </Container>
      </BodyArea>
      <ListContributorModal open={openListModal} onDismiss={handleListModal} data={purchaserList} unit={unit} quoteERCToken={quoteERCToken} />
    </Page>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const HeadArea = styled(Box)`
  padding: 5rem 0;
  // background-image: url('/images/Group.png');
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  background-color: ${props => props.theme.palette.background.default};
  display: flex;
  align-items: center;
`;
const WrapContain = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 6px;

`;
const Status = styled(Box)`
  padding: 4px 19px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ViewProject = styled(Button)`
  height: 46px;
  width: 185px;
  display: flex;
  gap: 12px;
  align-items: center;
  background-color: #053434;
  border-radius: 4px;
`;
const EditInfo = styled(Button)`
    width: 215px;
    height 44px;
    border: 1px solid;
    border-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 4px;
    background: #000000;
    display: flex;
    align-items: center;
    gap: 15px;
`;
const BodyArea = styled(Box)`
  min-height: 100vh;
  height: auto;
  padding: 3rem 0;
`;
const InforBox = styled(Box)`
  
`;
const ActiveBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 44px;
`;
const ProgressBox = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border-radius: 8px;
  padding: 16px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const VerticalLine = styled(Box)`
  width: 1px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.divider};
`;
const HorizonLine = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.divider};
`;
const StyledTabs = styled(Tabs)`
  .MuiButtonBase-root {
    text-transform: none;
  }
`
const TabPanelCustom = styled(TabPanel)`
  > .MuiBox-root {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
const SaleBox = styled(Box)`
  padding: 16px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ButtonInLine = styled(Button)`
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonOutLine = styled(Button)`
  border-radius: 4px;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MyProjectDetail;
