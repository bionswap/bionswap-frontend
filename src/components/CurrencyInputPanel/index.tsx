import {BiChevronDown} from 'react-icons/bi'
import { Box, Button, InputAdornment, Stack, styled, TextField, Typography } from "@mui/material";
import { Currency, CurrencyAmount, JSBI } from "@bionswap/core-sdk";
import { CurrencyLogo } from "components";
import CurrencySearch from "components/ManageCurrencyListModal/CurrencySearch";
import { useAccount, useCurrencyBalance, useUSDCValue } from "hooks";
import { useCallback, useState } from "react";
import { tryParseAmount } from "utils/parse";
import ManageCurrencyListModal from "components/ManageCurrencyListModal";

type Props = {
  value: string;
  onUserInput: (value: string) => void;
  onInputBlur?: () => void;
  onCurrencySelect?: (currency: Currency) => void;
  currency?: Currency;
  otherCurrency?: Currency;
  isMax?: boolean;
};

const CurrencyInputPanel = ({
  value,
  onUserInput,
  onInputBlur,
  onCurrencySelect,
  currency,
  otherCurrency,
  isMax = false,
}: Props) => {
  const { address: account } = useAccount();
  const currencyBalance = useCurrencyBalance(account, currency);
  const usdValue = useUSDCValue(tryParseAmount(value || "1", currency));

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect?.(currency);
      setSearchModalOpen(false);
    },
    [onCurrencySelect]
  );

  const handleMaxBalance = () => {
    onUserInput(currencyBalance?.toFixed(2)?.toString() || "");
  };

  const handleCloseSearchModal = useCallback(() => {
    setSearchModalOpen(false);
  }, []);

  return (
    <WrapCurrencyInputPanel>
      <Stack>
        <Stack direction="row" justifyContent="space-between" width={"100%"} mb="7px">
          {/* <Typography variant="body3Poppins" sx={{
            color: 'gray.300',
            fontWeight: '400',
          }}>
            {`~$${usdValue?.toFixed(2) || 0}`}
          </Typography> */}
          <Typography sx={{
            color: 'text.secondary', fontSize: '13px',
            fontWeight: '400',
          }}>
            Balance: {`${currencyBalance?.toFixed(4) || 0}`}
          </Typography>
          <Stack>
            {isMax && <MaxButton onClick={handleMaxBalance}>Max</MaxButton>}
          </Stack>
        </Stack>
        <TextField
          type={"number"}
          variant="standard"
          value={value}
          placeholder='0.0'
          onChange={(e) => {
            onUserInput(e.target.value);
          }}
          onBlur={() => {
            onInputBlur?.();
          }}
          sx={{
            backgroundColor: "transparent",
            width: '100%',

            "& .MuiInputBase-input": {
              fontWeight: "400",
              fontSize: "28px",
              lineHeight: "180%",
              padding: "0",
              color: 'text.primary'
            },
            borderRadius: 1,
          }}
          InputProps={{
            endAdornment: (
              <Button
                onClick={() => setSearchModalOpen(true)}
                sx={{
                  boxShadow: "none",
                  minWidth: "auto",
                  padding: '5px 10px',
                  backgroundColor: theme => (theme.palette as any).extra.swapPanel.background,
                  borderRadius: '999px',
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: theme => (theme.palette as any).extra.swapPanel.hover,
                    color: 'text.primary'
                  }
                }}
              >
                <Stack direction="row" spacing={1} color='inherit'>
                  <CurrencyLogo currency={currency} size={22} />
                  <Typography sx={{
                    fontWeight: '500',
                    color: 'inherit',
                  }}>
                    {currency?.symbol}
                  </Typography>
                  <BiChevronDown/>
                </Stack>
              </Button>
            ),
            disableUnderline: true,
          }}
        />
        
        <ManageCurrencyListModal
          open={searchModalOpen}
          onDismiss={handleCloseSearchModal}
          onCurrencySelect={handleCurrencySelect}
        />
      </Stack>
    </WrapCurrencyInputPanel>
  );
};

const WrapCurrencyInputPanel = styled(Box)`
  border-radius: 8px;
  background: ${(props) => (props.theme.palette as any).extra.swapPanel.panel};
  padding: 15px;
  border: none;
  transition: .12s ease-in;
`;
const MaxButton = styled(Button)`
  color: ${(props) => props.theme.palette.primary.main};;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  font-family: inherit;
  width: 45px;
  padding: 1px;
`;

export default CurrencyInputPanel;
