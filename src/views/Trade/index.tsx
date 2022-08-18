import { Currency, JSBI, Percent, Token, Trade as V2Trade, TradeType } from "@bionswap/core-sdk";
import { Autocomplete, Box, Button, Container, Stack, styled, TextField, Typography } from "@mui/material";
import { CurrencyInputPanel, TransactionSettings } from "components";
import {
  useAccount,
  useAllTokens,
  useCurrency,
  useEnsAddress,
  useIsSwapUnsupported,
  useSwapCallback,
  useUSDCValue,
  useWrapCallback,
} from "hooks";
import { ApprovalState, useApproveCallbackFromTrade } from "hooks/useApproveCallback";
import { WrapType } from "hooks/useWrapCallback";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Field } from "state/swap/actions";
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from "state/swap/hooks";
import { useExpertModeManager } from "state/user/hooks";
import { maxAmountSpend } from "utils/currencies";
import { confirmPriceImpactWithoutFee, warningSeverity } from "utils/prices";
import { computeFiatValuePriceImpact } from "utils/trade";
import ConfirmSwapModal from "./components/ConfirmSwapModal";
import PairStats from "./components/PairStats";
import TradePrice from "./components/TradePrice";
import TradingViewChart from "./components/TradingViewChart";

type SwapProps = {};

const Swap = ({}: SwapProps) => {
  const loadedUrlParams = useDefaultsFromURLSearch();
  const { address: account } = useAccount();
  const defaultTokens = useAllTokens();

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
    [loadedInputCurrency, loadedOutputCurrency]
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
    [independentField, parsedAmount, showWrap, trade]
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
    [onUserInput]
  );

  const handleSelectAmountPercentInput = useCallback(
    (percent: number) => {
      if (percent === 100) {
        onUserInput(Field.INPUT, maxAmountSpend(inputCurrencyBalance)?.toSignificant(6) || "0");
      } else {
        const value = inputCurrencyBalance?.multiply(new Percent(percent, 100));
        onUserInput(Field.INPUT, value?.toSignificant(6) || "0");
      }
    },
    [inputCurrencyBalance, onUserInput]
  );

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value);
    },
    [onUserInput]
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
        parsedAmounts[independentField]?.toExact() ?? ""
      : parsedAmounts[dependentField]?.toSignificant(6) ?? "",
  };

  const userHasSpecifiedInputOutput = Boolean(
    /* @ts-ignore TYPE NEEDS FIXING */
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
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

        // gtag(
        //   "event",
        //   recipient === null
        //     ? "Swap w/o Send"
        //     : (recipientAddress ?? recipient) === account
        //     ? "Swap w/o Send + recipient"
        //     : "Swap w/ Send",
        //   {
        //     event_category: "Swap",
        //     event_label: [
        //       trade?.inputAmount?.currency?.symbol,
        //       trade?.outputAmount?.currency?.symbol,
        //       singleHopOnly ? "SH" : "MH",
        //     ].join("/"),
        //   }
        // );

        // gtag(
        //   "event",
        //   singleHopOnly
        //     ? "Swap with multihop disabled"
        //     : "Swap with multihop enabled",
        //   {
        //     event_category: "Routing",
        //   }
        // );
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
  }, [swapCallback, priceImpact, tradeToConfirm, showConfirm]);

  // warnings on slippage
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact;
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact
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
      onUserInput(Field.INPUT, "");
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
    [onCurrencySelection]
  );

  const handleOutputSelect = useCallback(
    (outputCurrency: Currency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency);
    },
    [onCurrencySelection]
  );

  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT);

  const priceImpactCss = useMemo(() => {
    switch (priceImpactSeverity) {
      case 0:
      case 1:
      case 2:
      default:
        return "text-low-emphesis";
      case 3:
        return "text-yellow";
      case 4:
        return "text-red";
    }
  }, [priceImpactSeverity]);

  const SwapButton = useMemo(() => {
    let text = "";
    let onClick;
    let disabled = false;

    if (swapIsUnsupported) {
      text = `Unsupported Asset`;
    } else if (!account) {
      text = `Connect Wallet`;
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
        sx={{
          backgroundColor: "extra.swapButton.background",
          color: "extra.swapButton.color",
          marginTop: "22px",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "175%",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <Typography fontWeight={600} fontSize={14} sx={{ color: "extra.button.text" }}>
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

  return (
    <Section>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            gap: { xs: "30px", md: "16px" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          <Stack justifyContent="flex-start" alignItems="flex-start" flexGrow={1}>
            <PairStats />
            {!showWrap && <TradingViewChart pairSymbol={`${currencies.INPUT?.symbol}:${currencies.OUTPUT?.symbol}`} />}
          </Stack>
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
            }}
          >
            <Box display="flex" justifyContent="space-between" mt="25px">
              <SwapLabel>Swap Token</SwapLabel>
              <TransactionSettings />
            </Box>
            <Box mt="30px">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{
                  marginBottom: "22px",

                  input: {
                    fontFamily: "'Poppins', sans-serif",
                    color: "#ffffff",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    padding: "17px 5px !important",
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" placeholder="Enter token name / address..." />
                )}
              />
              <Box>
                <Box
                  sx={{
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    p: "18px",
                    borderRadius: "8px",
                    backgroundColor: "#000607",
                  }}
                >
                  {/* <Stack direction="row" justifyContent="space-between" height={50}>
          <Typography fontWeight={600} fontSize={16} color="#5B6469">
            Swap Token
          </Typography>
        </Stack> */}
                  {/* <Divider sx={{ mb: 2 }} /> */}
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.INPUT]}
                    currency={currencies[Field.INPUT]}
                    onUserInput={handleTypeInput}
                    onCurrencySelect={handleInputSelect}
                    otherCurrency={currencies[Field.OUTPUT]}
                    isMax={true}
                  />

                  {/* <Box sx={{ mt: 4 }}>
          <SelectAmountInput percents={[25, 50, 75, 100]} onSelect={handleSelectAmountPercentInput} />
        </Box> */}

                  <Stack direction="row" mt={2} mb={2}>
                    <Button
                      sx={{
                        borderRadius: "50%",
                        width: 35,
                        height: 35,
                        padding: 0,
                        minWidth: 0,
                      }}
                      onClick={onSwitchTokens}
                    >
                      {/* <ArrowDownwardIcon sx={{ fontSize: 15, color: "text.secondary" }} /> */}
                      <Image src="/images/trade/swap_icon.png" alt="swap_icon" width={35} height={35} />
                    </Button>
                  </Stack>

                  <CurrencyInputPanel
                    value={formattedAmounts[Field.OUTPUT]}
                    onUserInput={handleTypeOutput}
                    currency={currencies[Field.OUTPUT]}
                    onCurrencySelect={handleOutputSelect}
                    otherCurrency={currencies[Field.INPUT]}
                  />
                  {/* <Divider sx={{ mt: 4, mb: 1 }} /> */}
                  <Box mt="22px">{trade && <TradePrice price={trade?.executionPrice} />}</Box>
                  {SwapButton}
                </Box>
                {/* <Box
        sx={{
          border: "1px solid #F2F3F3",
          borderRadius: "8px",
          p: "12px",
          mt: 4.5,
        }}
      >
        <SwapDetail trade={trade} />
      </Box> */}
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
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  padding: 8vh 0;
  min-height: 100vh;
  background-color: ${(props) => props.theme.palette.background.default};
`;
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

const SwapLabel = styled(Box)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #f8f9f9;
`;
export default Swap;
