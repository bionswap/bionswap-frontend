import { Currency, CurrencyAmount, Percent, Trade, TradeType } from "@bionswap/core-sdk";
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useUserSlippageTolerance } from "state/user/hooks";
import { computeRealizedLPFeePercent } from "utils/prices";
import TradePrice from "../TradePrice";
import {HiOutlineChevronDown} from 'react-icons/hi'
import Divider from "@mui/material/Divider";

type Props = {
  recipient?: string;
  trade?: Trade<Currency, Currency, TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT>;
  minimumAmountOut?: CurrencyAmount<Currency>;
};

const SwapDetail = ({ recipient, trade, minimumAmountOut }: Props) => {
  const [allowedSlippage] = useUserSlippageTolerance();

  const minReceived = minimumAmountOut || trade?.minimumAmountOut(allowedSlippage);

  const priceImpact = useMemo(() => {
    if (!trade) return 0;
    const realizedLpFeePercent = computeRealizedLPFeePercent(trade);
    const priceImpact = trade?.priceImpact.subtract(realizedLpFeePercent);
    return priceImpact;
  }, [trade]);
  const realizedLpFeePercent = trade ? computeRealizedLPFeePercent(trade) : undefined;

  const path = useMemo(() => {
    return trade?.route.path;
    return [];
  }, [trade]);


  return (
    <Accordion sx={{
      background: theme => (theme.palette as any).extra.swapPanel.panel,
      backgroundImage: 'none',
      borderRadius: '8px!important',
      boxShadow: 'none'
    }}>
      <AccordionSummary
        expandIcon={<HiOutlineChevronDown />}
      >
        <TradePrice price={trade?.executionPrice} />
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={0.5}>
          {trade && (
            <Stack direction="row" justifyContent={"space-between"} width='100%'>
              <Typography sx={{
                color: 'text.secondary', fontSize: '12px'
              }}>
                {`Slippage tolerance`}
              </Typography>
              <Typography sx={{
                fontWeight: '500',
                color: 'text.primary',
                fontSize: '14px'
              }}>
                {allowedSlippage.toFixed(2)}%
              </Typography>
            </Stack>
          )}
        
            {trade && (
              <Stack direction="row" justifyContent={"space-between"} width='100%'>
                <Typography sx={{
                  color: 'text.secondary', fontSize: '12px'
                }}>
                  {`Price impact`}
                </Typography>
                <Typography sx={{
                  color: Number(priceImpact?.toFixed(2)) < 1 ? 'success.main' : Number(priceImpact?.toFixed(2)) < 3 ? 'warning.main' : 'error.main',
                  fontSize: '14px',
                }}>
                  {priceImpact instanceof Percent ? `${priceImpact.multiply(-1).toFixed(2)}%` : null}
                  {typeof priceImpact === "number" ? `${-priceImpact?.toFixed(2)}%` : null}
                </Typography>
              </Stack>
            )}
            <Divider flexItem />
            {trade && (
              <Stack direction="row" justifyContent={"space-between"} width='100%'>
                <Typography sx={{
                  color: 'text.secondary', fontSize: '12px'
                }}>
                  {`Minimum received`}
                </Typography>
                <Typography variant="body4Poppins" sx={{
                  color: 'text.secondary', fontSize: '12px'
                }}>
                  {minReceived?.toSignificant(6)} {minReceived?.currency.symbol}
                </Typography>
              </Stack>
            )}
          
            {trade && (
              <Stack direction="row" justifyContent={"space-between"} width='100%'>
                <Typography sx={{
                  color: 'text.secondary', fontSize: '12px'
                }}>
                  {`Liquidity provider fee`}
                </Typography>
                <Typography sx={{
                  color: 'text.secondary', fontSize: '12px'
                }}>
                  {realizedLpFeePercent?.toFixed(2)}%
                </Typography>
              </Stack>
            )}
            {/* {path && (
              <Stack direction="row" justifyContent={"space-between"} width='100%'>
                <Typography variant="body3Poppins" sx={{
                  fontWeight: '400',
                  color: 'gray.400'
                }}>
                  {`Route`}
                </Typography>
                <Typography variant="body3Poppins" sx={{
                  fontWeight: '400',
                  color: 'text.primary'
                }}>
                  {path.map((el) => el.symbol).join(" > ")}
                </Typography>
              </Stack>
            )} */}
        </Stack>
        
      </AccordionDetails>
    </Accordion>
  );
};

export default SwapDetail;
