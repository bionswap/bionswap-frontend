import {
  Box,
  CircularProgress,
  ListItem,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Currency } from "@bionswap/core-sdk";
import CurrencyLogo from "components/CurrencyLogo";
import { WrappedTokenInfo } from "bionswap-entities/WrappedTokenInfo";
import { useAccount, useCurrencyBalance } from "hooks";
import { CSSProperties, useCallback } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

type CurrencyRow = {
  currency: Currency;
  onCurrencySelect?: (currency: Currency) => void;
  style?: CSSProperties;
  index?: number;
  address?: string;
};

type CurrencyListProps = {
  currencies: Currency[];
  otherListTokens?: WrappedTokenInfo[];
  selectedCurrency?: Currency | null;
  otherCurrency?: Currency | null;
  onCurrencySelect?: (currency: Currency) => void;
};

const CurrencyRow = ({
  currency,
  style,
  index,
  onCurrencySelect,
  address,
}: CurrencyRow) => {
  const { address: account } = useAccount();
  const balance = useCurrencyBalance(account ?? undefined, currency);

  const minimizeAddressSmartContract = (str: any) => {
    if (!str) return;
    return str.substring(0, 8) + "..." + str.substring(str.length - 4, str.length);
  }

  return (
    <MenuItem style={style} onClick={() => onCurrencySelect?.(currency)}>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack direction="row">
          <CurrencyLogo currency={currency} size='26px' />
          <Stack sx={{ ml: '10px', alignItems: "flex-start" }}>
            <Stack direction="row" gap='4px'>
              <Typography variant="body4Poppins" color='text.primary' fontWeight='500'>
                {currency.symbol}
              </Typography>
              <Typography variant="body6Poppins" color='primary.main' fontWeight='500'>
                {currency.name}
              </Typography>
            </Stack>
            <Typography variant="body4Poppins" color='text.secondary' fontWeight='400'>
              {minimizeAddressSmartContract(address)}
            </Typography>
          </Stack>
        </Stack>
        {balance ? (
          <Typography variant="body3Poppins" color="text.primary" fontWeight='400'>
            {balance.toFixed(2)}
          </Typography>
        ) : account ? (
          <CircularProgress
            size={15}
            sx={{
              mr: 2,
            }}
          />
        ) : null}
      </Stack>
    </MenuItem>
  );
};

const CurrencyList = ({
  currencies,
  otherCurrency,
  otherListTokens,
  selectedCurrency,
  onCurrencySelect,
}: CurrencyListProps) => {
  const renderCurrencyRow = useCallback(
    ({ data, style, index }: ListChildComponentProps) => {
      return (
        <CurrencyRow
          currency={data[index]}
          address={data[index]?.tokenInfo?.address}
          key={data.symbol}
          style={style}
          index={index}
          onCurrencySelect={onCurrencySelect}
        />
      );
    },
    [onCurrencySelect]
  );

  return (
    <Box sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <FixedSizeList
        className='TokenListScrollBar'
        height={300}
        width="100%"
        itemSize={55}
        itemCount={currencies.length}
        overscanCount={10}
        itemData={currencies}
      >
        {renderCurrencyRow}
      </FixedSizeList>
    </Box>
  );
};

export default CurrencyList;
