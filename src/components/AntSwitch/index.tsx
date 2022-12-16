import {
    styled,
    Switch
} from '@mui/material'

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 48,
    height: 24,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 4,
      '&.Mui-checked': {
        transform: 'translateX(24px)',
        color: 'primary.main',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: (theme.palette as any).extra.button.backgroundGreenOpacity,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 16,
      height: 16,
      borderRadius: 8,
      color: theme.palette.primary.main,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 24 / 2,
      opacity: 1,
      backgroundColor: (theme.palette as any).extra.button.backgroundGreenOpacity,
      boxSizing: 'border-box',
    },
  }));

export default AntSwitch