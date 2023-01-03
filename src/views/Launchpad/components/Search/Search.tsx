import React from 'react'
import {
    InputAdornment,
    TextField
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


interface SearchProps {
    searchKeyword: (event:any) => void
}

const Search = ({searchKeyword}:SearchProps) => {
  return (
    <TextField
        variant="standard"
        onChange={searchKeyword}
        placeholder="Enter project name, token address or token symbol"
        fullWidth
        sx={{
        '.MuiInputBase-root': {
            padding: '12px',
        },
        input: {
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '180%',
            color: 'text.primary',
            '&:placeholder': {
            lineHeight: '180%',
            color: 'text.secondary',
            },
        },
        '.MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled):before': {
            borderBottom: theme => `1px solid ${(theme.palette as any).extra.card.divider}`,
        },
        '.MuiInput-root:before': {
            borderBottom: theme => `1px solid ${(theme.palette as any).extra.card.divider}`,
        },
        '.MuiInput-root:after': {
            borderWidth: '1px',
        },
        }}
        InputProps={{
        endAdornment: (
            <InputAdornment position="end">
            <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
        ),
        }}
    />
  )
}

export default Search