import React from 'react'
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    styled,
    useMediaQuery,
    Typography
} from '@mui/material'
import { useChain, useSwitchNetwork } from 'hooks';
import { CHAIN_INFO_MAP } from 'configs/chain';
import { getChainIcon } from "utils/chains";
import Image from "next/image";
import {HiChevronUpDown} from 'react-icons/hi2';


const ChainSelect = () => {
  const [chain, setChain] = React.useState('');
  const isMobile = useMediaQuery('(max-width:700px)');

  const handleChange = (event:any) => {
    setChain(event.target.value);
  };

  const { chainId, isConnected } = useChain();

  const { switchNetwork } = useSwitchNetwork({});
  return (
    <Box>
        <FormControl fullWidth>
            <StyledSelect   
                variant='outlined'
                value={chainId}
                onChange={handleChange}
                IconComponent={HiChevronUpDown}
            >
                {Object.entries(CHAIN_INFO_MAP).map(([, chain]) => (
                    (chain.id !== 97) &&
                    <MenuItem
                        sx={{
                            p: '8.5px 20px',
                            boxShadow: 'none',
                            // width: '166px',
                            '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected' : {
                                boxShadow: 'none',
                            }
                        }}
                        key={chain.id}
                        value={chain.id}
                        onClick={() => {
                        switchNetwork?.(chain?.id);
                        }}
                    >
                        <Box display="flex" gap="10px" alignItems="center">
                            <Stack>
                                <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={18} height={18} />
                            </Stack>
                            <Typography fontSize="14px">
                                {chain.name}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
                {Object.entries(CHAIN_INFO_MAP).map(([, chain]) => (
                    (chain.id === 97) &&
                    <MenuItem
                        sx={{
                            p: '8.5px 20px',
                            boxShadow: 'none',
                            // width: '166px',
                            borderTop: theme => `1px solid ${(theme.palette as any).extra.card.divider}`,
                            '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected' : {
                                boxShadow: 'none',
                            }
                        }}
                        key={chain.id}
                        value={chain.id}
                        onClick={() => {
                        switchNetwork?.(chain?.id);
                        }}
                    >
                        <Box display="flex" gap="10px" alignItems="center">
                            <Stack>
                                <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={18} height={18} />
                            </Stack>
                            <Box fontSize="14px">
                                {chain.name}
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    </Box>
  )
}

const StyledSelect = styled(Select)`
    .MuiSelect-select {
        padding: 6px 16px;
        transition: .12s ease-in;
        border-radius: 4px;
        border: 1.5px solid;
        border-color: ${props => (props.theme.palette as any).extra.card.hover};
        background-color: ${props => (props.theme.palette as any).extra.card.hover};
        :hover {
            border-color: ${props => (props.theme.palette as any).primary.main};
        }
    }
    fieldset {
        border: none;
    }
`

export default ChainSelect