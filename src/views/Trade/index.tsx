import { ChainId, Currency, JSBI, Percent, Token, Trade as V2Trade, TradeType } from '@bionswap/core-sdk';
import { Box, Button, Container, Stack, styled, Typography } from '@mui/material';
import { CurrencyInputPanel, TransactionSettings } from 'components';
import NoDataView from 'components/NoDataView';
import {
  useAccount,
  useAllTokens,
  useChain,
  useCurrency,
  useDarkMode,
  useEnsAddress,
  useIsSwapUnsupported,
  useSwapCallback,
  useUSDCValue,
  useWrapCallback,
} from 'hooks';
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback';
import { WrapType } from 'hooks/useWrapCallback';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Field } from 'state/swap/actions';
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks';
import { useExpertModeManager } from 'state/user/hooks';
import { maxAmountSpend } from 'utils/currencies';
import { confirmPriceImpactWithoutFee, warningSeverity } from 'utils/prices';
import { computeFiatValuePriceImpact } from 'utils/trade';
import ConfirmSwapModal from './components/ConfirmSwapModal';
import SwapDetail from './components/SwapDetail';
import TradePrice from './components/TradePrice';
import TradingViewChart from './components/TradingViewChart';
import {RiArrowUpDownFill , RiArrowDownLine} from 'react-icons/ri'
import Page from 'components/Page';
import ConnectorOptionsModal from 'components/ConnectButton/ConnectorOptionsModal';
import { Connector } from 'wagmi';
import useMediaQuery from 'hooks/useMediaQuery';

type SwapProps = {};

const Swap = ({}: SwapProps) => {
  const {isMobile} = useMediaQuery();
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const handleConnectorConnected = (connector: Connector) => {
    setOpenConnectorsModal(false);
    gtag('event', 'Connector Connected', {
      event_category: 'Connector',
      event_label: connector.name,
    });
  };
  
  const loadedUrlParams = useDefaultsFromURLSearch();
  const [hoverSwap , setHoverSwap] = useState(false);
  const { address: account } = useAccount();
  const defaultTokens = useAllTokens();
  const { chainId } = useChain();

  const [isExpertMode] = useExpertModeManager();
  const { independentField, typedValue, recipient } = useSwapState();
  const {
    v2Trade,
    parsedAmount,
    currencies,
    inputError: swapInputError,
    allowedSlippage,
    to,
    currencyBalances,
  } = useDerivedSwapInfo();

  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ];

  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false);
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  );
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true);
  }, []);

  // dismiss warning if all imported tokens are in active lists
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in defaultTokens);
    });

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue);
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  const { data: recipientAddress } = useEnsAddress({ name: recipient });

  const trade = showWrap ? undefined : v2Trade;

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade],
  );

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT]);
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT]);
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput);
  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers();

  const isValid = !swapInputError;
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const inputCurrencyBalance = currencyBalances[Field.INPUT];

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value);
    },
    [onUserInput],
  );

  const handleSelectAmountPercentInput = useCallback(
    (percent: number) => {
      if (percent === 100) {
        onUserInput(Field.INPUT, maxAmountSpend(inputCurrencyBalance)?.toSignificant(6) || '0');
      } else {
        const value = inputCurrencyBalance?.multiply(new Percent(percent, 100));
        onUserInput(Field.INPUT, value?.toSignificant(6) || '0');
      }
    },
    [inputCurrencyBalance, onUserInput],
  );

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value);
    },
    [onUserInput],
  );

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean;
    tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined;
    attemptingTxn: boolean;
    swapErrorMessage: string | undefined;
    txHash: string | undefined;
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  });

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? /* @ts-ignore TYPE NEEDS FIXING */
        parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };

  const userHasSpecifiedInputOutput = Boolean(
    /* @ts-ignore TYPE NEEDS FIXING */
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  );

  const routeNotFound = !trade?.route;

  // check whether the user has approved the router on the input token
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);

  const signatureData = undefined;

  const handleApprove = useCallback(async () => {
    await approveCallback();
    // if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
    //   try {
    //     await gatherPermitSignature()
    //   } catch (error) {
    //     // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
    //     if (error?.code !== USER_REJECTED_TRANSACTION) {
    //       await approveCallback()
    //     }
    //   }
    // } else {
    //   await approveCallback()
    // }
  }, [approveCallback]);
  // }, [approveCallback, gatherPermitSignature, signatureState])

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState, approvalSubmitted]);

  // Checks if user has enabled the feature and if the wallet supports it
  //   const sushiGuardEnabled = useSushiGuardFeature();

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, to);

  //   const [singleHopOnly] = useUserSingleHopOnly();

  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return;
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return;
    }
    setSwapState({
      attemptingTxn: true,
      tradeToConfirm,
      showConfirm,
      swapErrorMessage: undefined,
      txHash: undefined,
    });
    swapCallback()
      .then((hash) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: hash,
        });

        gtag(
          'event',
          recipient === null
            ? 'Swap w/o Send'
            : (recipientAddress ?? recipient) === account
            ? 'Swap w/o Send + recipient'
            : 'Swap w/ Send',
          {
            event_category: 'Swap',
            event_label: [
              trade?.inputAmount?.currency?.symbol,
              trade?.outputAmount?.currency?.symbol,
              // singleHopOnly ? 'SH' : 'MH',
              'MH',
            ].join('/'),
          },
        );

        // gtag('event', singleHopOnly ? 'Swap with multihop disabled' : 'Swap with multihop enabled', {
        //   event_category: 'Routing',
        // });
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        });
      });
  }, [
    swapCallback,
    priceImpact,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade?.inputAmount?.currency?.symbol,
    trade?.outputAmount?.currency?.symbol,
  ]);

  // warnings on slippage
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact;
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact,
    );
  }, [priceImpact, trade]);

  //   const isArgentWallet = useIsArgentWallet();

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    // !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode);

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({
      showConfirm: false,
      tradeToConfirm,
      attemptingTxn,
      swapErrorMessage,
      txHash,
    });
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '');
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);

  const handleAcceptChanges = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      swapErrorMessage,
      txHash,
      attemptingTxn,
      showConfirm,
    });
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash]);

  const handleInputSelect = useCallback(
    (inputCurrency: Currency) => {
      setApprovalSubmitted(false); // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency);
    },
    [onCurrencySelection],
  );

  const handleOutputSelect = useCallback(
    (outputCurrency: Currency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency);
    },
    [onCurrencySelection],
  );

  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT);

  const priceImpactCss = useMemo(() => {
    switch (priceImpactSeverity) {
      case 0:
      case 1:
      case 2:
      default:
        return 'text-low-emphesis';
      case 3:
        return 'text-yellow';
      case 4:
        return 'text-red';
    }
  }, [priceImpactSeverity]);

  const SwapButton = useMemo(() => {
    let text = '';
    let onClick;
    let disabled = false;


    if (swapIsUnsupported) {
      text = `Unsupported Asset`;
    } else if (!account) {
      text = `Connect Wallet`;
      onClick = () => setOpenConnectorsModal(true)
    } else if (showWrap) {
      onClick = onWrap;
      if (wrapInputError) {
        text = wrapInputError;
        disabled = true;
      } else if (wrapType === WrapType.WRAP) {
        text = `Wrap`;
      } else if (wrapType === WrapType.UNWRAP) {
        text = `Unwrap`;
      }
    } else if (showApproveFlow) {
      if (approvalState !== ApprovalState.APPROVED) {
        onClick = handleApprove;
        disabled = approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted;
        text = `Approve ${currencies[Field.INPUT]?.symbol}`;
      } else if (approvalState === ApprovalState.APPROVED) {
        onClick = () => {
          if (isExpertMode) {
            handleSwap();
          } else {
            setSwapState({
              tradeToConfirm: trade,
              attemptingTxn: false,
              swapErrorMessage: undefined,
              showConfirm: true,
              txHash: undefined,
            });
          }
        };
        disabled = !isValid || approvalState !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode);

        if (priceImpactSeverity > 3 && !isExpertMode) {
          text = `Price Impact High`;
        } else if (priceImpactSeverity > 2) {
          text = `Swap Anyway`;
        } else {
          text = `Swap`;
        }
      }
    } else {
      onClick = () => {
        if (isExpertMode) {
          handleSwap();
        } else {
          setSwapState({
            tradeToConfirm: trade,
            attemptingTxn: false,
            swapErrorMessage: undefined,
            showConfirm: true,
            txHash: undefined,
          });
        }
      };
      disabled = !isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError;

      if (swapInputError) {
        text = swapInputError;
      } else if (priceImpactSeverity > 3 && !isExpertMode) {
        text = `Price Impact High`;
      } else if (priceImpactSeverity > 2) {
        text = `Swap Anyway`;
      } else {
        text = `Swap`;
      }
    }

    return (
      <Button
        disabled={disabled}
        onClick={onClick}
        fullWidth
        variant='contained'
        sx={{
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '175%',
          padding: '10px',
          borderRadius: '8px',
          transition: '.12s ease-in',
          background: disabled ? 'inherit' : theme =>  (theme.palette as any).extra.button.linear,
          '&:hover': {
            background: theme =>  (theme.palette as any).extra.button.linear,
          },
        }}
      >
        <Typography fontWeight={500} sx={{ color: 'inherit' }}>
          {text}
        </Typography>
      </Button>
    );
  }, [
    account,
    approvalState,
    approvalSubmitted,
    currencies,
    handleApprove,
    handleSwap,
    isExpertMode,
    isValid,
    onWrap,
    priceImpactSeverity,
    showApproveFlow,
    showWrap,
    swapCallbackError,
    swapInputError,
    swapIsUnsupported,
    trade,
    wrapInputError,
    wrapType,
  ]);

  const { darkMode } = useDarkMode();

  return (
    <Page
      sx={{
        backgroundImage: "url('/images/stackbg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        objectFit: 'cover',
        backgroundColor: darkMode ? null : theme => (theme.palette as any).extra.background.alt
      }}
    >
      <Container maxWidth="xl">
        <Section>
          {/* <Stack justifyContent="flex-start" alignItems="flex-start" flexGrow={1}>
            {ChainId.BSC_TESTNET === chainId ? (
              <>
                {!showWrap && (
                  <TradingViewChart pairSymbol={`${currencies.INPUT?.symbol}:${currencies.OUTPUT?.symbol}`} />
                )}
              </>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  paddingTop: '80px',
                }}
              >
                <NoDataView />
              </Box>
            )}
          </Stack> */}
          <Box
            sx={{
              maxWidth: '440px',
              // width: { xs: '100%', md: '30%' },
            }}
          >
            <Box>
              <WrapSwapBox minWidth={isMobile ? '90%' : '440px'}>
                <Stack direction='row'
                  sx={{
                    padding: '16px 24px 0 24px',
                    width: '100%',
                    justifyContent: 'space-between',
                    // borderBottom: theme => `1px solid ${(theme.palette as any).extra.card.divider}`
                  }}
                >
                  <Stack spacing={0.5} alignItems='start'>
                    <Typography
                      sx={{
                        fontWeight: '500', fontSize: '18px',
                        color: 'text.primary',
                      }}
                    >
                      Swap
                    </Typography>
                  </Stack>
                  <TransactionSettings />
                </Stack>
                <Box p='16px'>
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.INPUT]}
                    currency={currencies[Field.INPUT]}
                    onUserInput={handleTypeInput}
                    onCurrencySelect={handleInputSelect}
                    otherCurrency={currencies[Field.OUTPUT]}
                    isMax={false}
                  />
                  <Stack
                    direction="row"
                    sx={{
                      marginTop: '-20px',
                      marginBottom: '-20px',
                    }}
                  >
                    <Button
                      variant='contained'
                      sx={{
                        borderRadius: '50%',
                        width: 45,
                        height: 45,
                        padding: 0,
                        minWidth: 0,
                        color: 'primary.main',
                        backgroundColor: theme => (theme.palette as any).extra.swapPanel.panel,
                        border:  theme => `5px solid ${(theme.palette as any).extra.swapPanel.background}`,
                        ':hover': {
                          color: 'background.default',
                          backgroundColor: 'primary.main',
                          boxShadow: 'none'
                        },
                        'svg': {
                          width: '18px', height: '18px'
                        }

                      }}
                      onClick={onSwitchTokens}
                      onMouseEnter={() => setHoverSwap(true)}
                      onMouseLeave={() => setHoverSwap(false)}
                    >
                      {hoverSwap ? <RiArrowUpDownFill/> : <RiArrowDownLine/>}
                    </Button>
                  </Stack>
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.OUTPUT]}
                    onUserInput={handleTypeOutput}
                    currency={currencies[Field.OUTPUT]}
                    onCurrencySelect={handleOutputSelect}
                    otherCurrency={currencies[Field.INPUT]}
                  />
                  {trade &&
                      <MoreDetailBox>
                        <SwapDetail trade={trade} />
                      </MoreDetailBox>
                  }
                  <Box mt='16px'>
                    {SwapButton}
                  </Box>
                </Box>
                <ConfirmSwapModal
                  open={showConfirm}
                  trade={trade}
                  originalTrade={tradeToConfirm}
                  onAcceptChanges={handleAcceptChanges}
                  attemptingTxn={attemptingTxn}
                  txHash={txHash}
                  recipient={recipient}
                  allowedSlippage={allowedSlippage}
                  onConfirm={handleSwap}
                  swapErrorMessage={swapErrorMessage}
                  onDismiss={handleConfirmDismiss}
                />
              </WrapSwapBox>
            </Box>
          </Box>
        </Section>
      </Container>
      <ConnectorOptionsModal
        onClose={() => setOpenConnectorsModal(false)}
        open={openConnectorsModal}
        onConnectorConnected={handleConnectorConnected}
      />
    </Page>
  );
};

const Section = styled(Box)`
  padding: 8rem 0;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const FlexBox = styled(Box)`
  display: flex;
`;
const top100Films = [
  { label: 'USDT', token: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
  { label: 'BUSD', token: '0x4Fabb145d64652a948d72533023f6E7A623C7C53' },
  { label: 'Shiba Inu', token: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce' },
  { label: 'Polkadot', token: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402' },
  { label: 'Dogecoin', token: '0xba2ae424d960c26247dd6c32edc70b295c744c43' },
];
const WrapSwapBox = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.swapPanel.background};
  border-radius: 12px;
  height: 100%;
`;
const MoreDetailBox = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.swapPanel.panel};
  border-radius: 8px;
  margin-top: 10px;
`
const PaperItem = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.swapPanel.background};
`;

export default Swap;
