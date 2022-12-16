import { ChainId, Currency, NATIVE, Token } from '@bionswap/core-sdk';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, Stack, styled, TextField, Tooltip, Typography } from '@mui/material';
import {
  useAllTokens,
  useChain,
  useDebounce,
  useIsUserAddedToken,
  useSortedTokensByQuery,
  useToken,
  useTokenComparator,
} from 'hooks';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {BsSearch} from 'react-icons/bs'
import { filterTokens } from 'utils/filter';
import { isAddress } from 'utils/validate';
import { ManageCurrencyListModalView, useManageCurrencyListModalContext } from '.';
import CommonBases from './CommonBases';
import CurrencyList from './CurrencyList';
import ImportRow from './ImportRow';

type Props = {
  otherSelectedCurrency?: Currency | null;
  showCommonBases?: boolean;
  currencyList?: (string | undefined)[];
  allowManageTokenList?: boolean;
};

const CurrencySearch = ({
  otherSelectedCurrency,
  showCommonBases,
  currencyList,
  allowManageTokenList = true,
}: Props) => {
  const { chainId } = useChain();
  const allTokens = useAllTokens();
  // const currencies = useMemo(() => Object.values(allTokens), [allTokens]);

  const { setView, onDismiss, onSelect, includeNative, showSearch, setImportToken } =
    useManageCurrencyListModalContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState('');

  const [, cancelSearch] = useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
    },
    200,
    [searchQuery],
  );

  const isAddressSearch = isAddress(debouncedSearchQuery);

  useEffect(() => {
    if (isAddressSearch) {
      gtag('event', 'Search by address', {
        event_category: 'Currency Select',
        event_label: isAddressSearch,
      });
    }
  }, [isAddressSearch]);

  const searchToken = useToken(debouncedSearchQuery);
  const searchTokenIsAdded = useIsUserAddedToken(searchToken);
  const tokenComparator = useTokenComparator();

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedSearchQuery);
  }, [allTokens, debouncedSearchQuery]);

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator);
  }, [filteredTokens, tokenComparator]);

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedSearchQuery);

  // @ts-ignore TYPE NEEDS FIXING
  const ether = useMemo(() => chainId && ![ChainId.CELO].includes(chainId) && NATIVE[chainId], [chainId]);

  const filteredSortedTokensWithETH: Currency[] = useMemo(() => {
    const s = debouncedSearchQuery.toLowerCase().trim();
    if (s === '' || s === 'e' || s === 'et' || s === 'eth') {
      return ether ? [ether, ...filteredSortedTokens] : filteredSortedTokens;
    }
    return filteredSortedTokens;
  }, [debouncedSearchQuery, ether, filteredSortedTokens]);

  const handleInput = useCallback((event: any) => {
    const input = event.target.value;
    const checkSum = isAddress(input);
    setSearchQuery(checkSum || input);
  }, []);

  const handleImport = useCallback(() => {
    if (searchToken) {
      setImportToken(searchToken);
    }

    setView(ManageCurrencyListModalView.importToken);
  }, [searchToken, setImportToken, setView]);

  return (
    <Stack>
      <Stack direction="column" alignItems="flex-start" gap="15px" width="100%" padding="16px">
        <Typography color="text.primary" fontSize='18px'>
          Select a token
        </Typography>
        <TextField
          variant="standard"
          placeholder="Enter token name / address..."
          fullWidth
          value={searchQuery}
          onChange={handleInput}
          sx={{
            '.MuiInputBase-formControl': {
              borderRadius: '8px',
              padding: '13px 15px',
              transition: '.12s ease-in',
              backgroundColor: theme => (theme.palette as any).extra.swapPanel.panel,
              border: theme => `1px solid ${(theme.palette as any).extra.swapPanel.divider}`
              // '&.Mui-focused': {
              //   border: theme => `1px solid ${theme.palette.primary.main}`,
              //   // boxShadow:
              //   //   'rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
              // },
            },

            input: {
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '180%',
            },
          }}
          InputProps={{
            endAdornment: <BsSearch/>,
            disableUnderline: true,
          }}
        />
        <CommonBases onCurrencySelect={onSelect} />
        <Stack
          sx={{
            border: '1px solid',
            borderColor: theme => (theme.palette as any).extra.card.divider,
            width: '100%',
            borderRadius: '8px',
            backgroundColor: theme => (theme.palette as any).extra.swapPanel.panel
          }}
        >
          {searchToken && !searchTokenIsAdded && <ImportRow token={searchToken} onClick={handleImport} />}
          <CurrencyList currencies={filteredSortedTokensWithETH} onCurrencySelect={onSelect} />
        </Stack>
        <ManageTokenBtn variant='text' fullWidth onClick={() => setView(ManageCurrencyListModalView.manage)}>
          <img src="/images/sticky_note_2.png" alt="sticky_note_2.png" />
          <Typography fontSize='14px' color="primary.main">
            Manage Token List
          </Typography>
        </ManageTokenBtn>
      </Stack>
      {/* <Stack>
          <Stack direction="row" alignSelf="flex-start" gap={1} mb={1}>
            <Typography fontSize={12} sx={{ color: "text.secondary" }}>
              Common bases
            </Typography>
            <Tooltip title="These token are commonly paired with other tokens">
              <HelpOutlineIcon sx={{ fontSize: 15, color: "text.primary" }} />
            </Tooltip>
          </Stack>

        </Stack> */}
      
    </Stack>
  );
};

const ManageTokenBtn = styled(Button)`
  gap: 5px;
`;

export default memo(CurrencySearch);
