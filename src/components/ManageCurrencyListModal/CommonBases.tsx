import { Currency } from "@bionswap/core-sdk";
import { Button, Stack, styled, Typography } from "@mui/material";
import CurrencyLogo from "components/CurrencyLogo";
import { COMMON_BASES } from "configs/routing";
import { useChain } from "hooks";
import React from "react";

type Props = {
  onCurrencySelect?: (currency: Currency) => void;
};

const CommonBases = ({ onCurrencySelect }: Props) => {
  const { chainId } = useChain();
  const bases =
    typeof chainId !== "undefined" ? COMMON_BASES[chainId] ?? [] : [];

  return (
    <Stack
      flexWrap={"wrap"}
      direction="row"
      gap='10px'
      justifyContent="flex-start"
    >
      {bases.map((currency) => (
        <WrapButton
          key={currency.name}
          onClick={() => onCurrencySelect?.(currency)}
        >
          <Stack direction="row" gap='5px'>
            <CurrencyLogo currency={currency} />
            <Typography fontSize='14px' fontWeight='500' color='text.primary'>
              {currency.symbol}
            </Typography>
          </Stack>
        </WrapButton>
      ))}
    </Stack>
  );
};

const WrapButton = styled(Button)`
  border-radius: 999px;
  border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  padding: 10px;
  :hover {
    background-color: ${props => (props.theme.palette as any).extra.swapPanel.hover}
  }
`

export default CommonBases;
