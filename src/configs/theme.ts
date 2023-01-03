import { createTheme, Palette, PaletteOptions, ThemeOptions } from '@mui/material';
import { ColorPartial, SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { PartialDeep } from 'type-fest';

type ExtraThemeProp = { [any: string]: string | ExtraThemeProp };
type ExtendedPaletteOptions = PartialDeep<Palette> & {
  extra?: ExtraThemeProp;
};

declare module '@mui/material' {
  interface TypographyVariants {
    h2Samsung: React.CSSProperties;
    h3Samsung: React.CSSProperties;
    h4Samsung: React.CSSProperties;
    h5Samsung: React.CSSProperties;
    h6Samsung: React.CSSProperties;
    h7Samsung: React.CSSProperties;
    h8Samsung: React.CSSProperties;
    body3Samsung: React.CSSProperties;

    h0Poppins: React.CSSProperties;
    h1Poppins: React.CSSProperties;
    h3Poppins: React.CSSProperties;
    h5Poppins: React.CSSProperties;
    h4Poppins: React.CSSProperties;
    h6Poppins: React.CSSProperties;
    bodyPoppins: React.CSSProperties;
    body2Poppins: React.CSSProperties;
    body3Poppins: React.CSSProperties;
    body4Poppins: React.CSSProperties;
    body6Poppins: React.CSSProperties;
    subtitle2Poppins: React.CSSProperties;
    captionPoppins: React.CSSProperties;
    caption6Poppins: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h2Samsung: React.CSSProperties;
    h3Samsung: React.CSSProperties;
    h4Samsung: React.CSSProperties;
    h5Samsung: React.CSSProperties;
    h6Samsung: React.CSSProperties;
    h7Samsung: React.CSSProperties;
    h8Samsung: React.CSSProperties;
    body3Samsung: React.CSSProperties;

    h0Poppins: React.CSSProperties;
    h1Poppins: React.CSSProperties;
    h3Poppins: React.CSSProperties;
    h5Poppins: React.CSSProperties;
    h4Poppins: React.CSSProperties;
    h6Poppins: React.CSSProperties;
    bodyPoppins: React.CSSProperties;
    body2Poppins: React.CSSProperties;
    body3Poppins: React.CSSProperties;
    body4Poppins: React.CSSProperties;
    body6Poppins: React.CSSProperties;
    subtitle2Poppins: React.CSSProperties;
    captionPoppins: React.CSSProperties;
    caption6Poppins: React.CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    blue: ColorPartial;
    green: ColorPartial;
    yellow: ColorPartial;
    red: ColorPartial;
    gray: ColorPartial;
    darkGreen: ColorPartial;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h2Samsung: true;
    h3Samsung: true;
    h4Samsung: true;
    h5Samsung: true;
    h6Samsung: true;
    h7Samsung: true;
    h8Samsung: true;
    body3Samsung: true;

    h0Poppins: true;
    h1Poppins: true;
    h3Poppins: true;
    h5Poppins: true;
    h4Poppins: true;
    h6Poppins: true;
    bodyPoppins: true;
    body2Poppins: true;
    body3Poppins: true;
    body4Poppins: true;
    body6Poppins: true;
    subtitle2Poppins: true;
    captionPoppins: true;
    caption6Poppins: true;
  }
}

export const lightPalette: ExtendedPaletteOptions = {
  mode: 'light',
  primary: {
    main: '#029E9E',
    light: '#242D35',
    dark: '#016B6B',
  },
  secondary: {
    main: '#6803B8',
    light: '#9A6AFF',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#121212',
    secondary: '#687785',
    disabled: 'rgba(0, 0, 0, 0.2)',
  },
  success: {
    main: '#2AC89F',
  },
  error: {
    main: '#EB5757',
  },
  warning: {
    main: '#FFB21E',
  },
  extra: {
    card: {
      background: '#FFF',
      light: '#F1F1F1',
      hover: '#EAEAEA',
      divider: 'rgba(0,0,0,.12)',
    },
    swapPanel: {
      background: '#FFF',
      panel: '#F2F5FA',
      hover: '#EAEAEA',
      divider: 'rgba(0,0,0,.12)',
    },
    table: {
      background: '#FFF',
      light: '#FFF',
      hover: '#EAEAEA',
      divider: 'rgba(0,0,0,.12)',
    },
    background: {
      alt: '#F2F5FA',
    },
    button: {
      backgroundGreenOpacity: '#bff0e5',
      lighter: 'rgba(0,0,0, .02)',
      linear: 'linear-gradient(93.49deg, #15D7A2 0.54%, #0AC6D6 100%)',
    },
    text: {
      linear: 'linear-gradient(133.2deg, #b33ee7 2.95%, #32c1ce 48.27%, #3cff5c 100%)',
    },
    walletModal: {
      background: '#ffffff',
      divider: '#ebebeb',
      textPrimary: '#000A0D',
      textSecondary: '#929292',
      hover: '#f2f2f2b2',
    },
  },
};

export const darkPalette: ExtendedPaletteOptions = {
  mode: 'dark',
  blue: {
    '50': '#F7F7FB',
    '100': '#D8D8FE',
    '200': '#B3B3FD',
    '300': '#8484F8',
    '400': '#6E6EF7',
    '500': '#4040F2',
    '600': '#3333D1',
    '700': '#2323BE',
    '800': '#181894',
    '900': '#0D0D54',
  },
  green: {
    '50': '#F6FFF0',
    '100': '#E6FBD9',
    '200': '#C9F884',
    '300': '#A0EC8A',
    '400': '#79D969',
    '500': '#44C13C',
    '600': '#2BA52E',
    '700': '#1E8A29',
    '800': '#0F5B1D',
    '900': '#073E16',
  },
  yellow: {
    '50': '#FFFEEC',
    '100': '#FFF9CF',
    '200': '#FFF19F',
    '300': '#FFE86F',
    '400': '#FFDE4B',
    '500': '#FFCF0F',
    '600': '#DBAD0A',
    '700': '#B78D07',
    '800': '#7B5C03',
    '900': '#4F3903',
  },
  red: {
    '50': '#FFF4EC',
    '100': '#FFE8D7',
    '200': '#FFCCB0',
    '300': '#FFA988',
    '400': '#FF886B',
    '500': '#FF513A',
    '600': '#DB302A',
    '700': '#B71D23',
    '800': '#931222',
    '900': '#7A0B21',
  },
  gray: {
    '50': '#FAFAFA',
    '100': '#F1F1F1',
    '200': '#EAECEE',
    '300': '#D6DADE',
    '400': '#A8B0B9',
    '500': '#717A8D',
    '600': '#4F5B67',
    '700': '#373F47',
    '800': '#242D35',
    '900': '#0D1B21',
  },
  darkGreen: {
    '50': '#02B0B0',
    '100': '#029E9E',
    '200': '#017E7E',
    '300': '#016B6B',
    '400': '#015858',
    '500': '#014E4E',
    '600': '#004545',
    '700': '#003939',
    '800': '#013535',
    '900': '#012D2D',
  },
  warning: {
    main: '#FFB21E',
  },
  error: {
    main: '#F93232',
  },
  success: {
    main: '#2AC89F',
  },
  primary: {
    main: '#07E0E0',
    light: '#242D35',
    dark: '#059494',
  },
  secondary: {
    main: '#6803B8',
    light: '#9A6AFF',
  },
  background: {
    default: '#000A0D',
    paper: '#27344b',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#a7a7a7',
    disabled: 'rgba(255, 255, 255, 0.2)',
  },
  extra: {
    // card: {
    //   background: '#0C1823',
    //   light: '#1B2332',
    //   hover: '#343b4b',
    //   divider: 'rgba(255,255,255,.12)'
    // },
    card: {
      background: '#1B2332',
      light: '#27344b',
      hover: '#3f5173',
      divider: 'rgba(255,255,255,.12)',
    },
    swapPanel: {
      background: '#1B2332',
      panel: '#0C1823',
      hover: '#3f5173',
      divider: 'rgba(255,255,255,.12)',
    },
    table: {
      background: '#1B2332',
      light: '#27344b',
      hover: '#3f5173',
      divider: 'rgba(255,255,255,.12)',
    },
    button: {
      backgroundGreenOpacity: 'rgba(0, 205, 255, 0.2)',
      lighter: 'rgba(255,255,255, .01)',
      linear: 'linear-gradient(93.49deg, #15D7A2 0.54%, #0AC6D6 100%)',
    },
    background: {
      alt: '#000A0D',
    },
    text: {
      linear: 'linear-gradient(133.2deg, #D184F3 2.95%, #87D3DA 48.27%, #8CF99E 100%)',
    },
    walletModal: {
      background: '#ffffff',
      divider: '#ebebeb',
      textPrimary: '#000A0D',
      textSecondary: '#929292',
      hover: '#f2f2f2b2',
    },
  },
};

const getComponentTheme = (basePalette: ExtendedPaletteOptions): ThemeOptions => {
  return {
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '64px',
      },
      h2: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '56px',
      },
      h3: {
        fontWeight: '400',
        fontSize: '24px',
      },
      h4: {
        fontWeight: '600',
        fontSize: '28px',
      },
      h6: {
        fontWeight: '400',
        fontSize: '20px',
      },
      subtitle1: {
        fontFamily: 'AnonymousPro-Bold',
        fontSize: '20px',
      },
      body1: {
        fontWeight: '400',
        fontSize: '16px',
      },
      h2Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '48px',
      },
      h4Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '40px',
        lineHeight: '100%',

        '@media (max-width: 1199px)': {
          fontSize: '1.7rem',
        },
      },
      h3Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '32px',
      },
      h5Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '24px',
      },
      h6Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '20px',
      },
      h7Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '28px',
        lineHeight: '100%',
      },
      h8Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '30px',
        lineHeight: '100%',
      },
      body3Samsung: {
        fontSize: '16px',
      },

      h0Poppins: {
        fontSize: '42px',
      },
      h1Poppins: {
        fontSize: '36px',
      },
      h3Poppins: {
        fontSize: '32px',
      },
      h5Poppins: {
        fontSize: '30px',
        lineHeight: '100%',
      },
      h4Poppins: {
        fontSize: '28px',
      },
      h6Poppins: {
        fontSize: '20px',
      },
      bodyPoppins: {
        fontSize: '20px',
      },
      body2Poppins: {
        fontSize: '18px',
      },
      body3Poppins: {
        fontSize: '16px',
      },
      body4Poppins: {
        fontSize: '14px',
      },
      body6Poppins: {
        fontSize: '10px',
      },
      subtitle2Poppins: {
        fontSize: '15px',
      },
      captionPoppins: {
        fontSize: '12px',
      },
      caption6Poppins: {
        fontSize: '14px',
      },

      button: {
        // fontStyle: 'italic',
        fontFamily: 'inherit',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1316,
        xl: 1536,
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'text',
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            fontStyle: 'normal',
            '&:hover': {
              opacity: '0.9',
              boxShadow: 'none',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            width: '100%',
            p: 1.5,
            borderRadius: '0',
            '&.Mui-selected': {
              // backgroundColor: 'transparent',
              // boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.24)',
              '&:hover': {
                // backgroundColor: 'transparent',
              },
            },
            '& .MuiTouchRipple-root': {
              color: (basePalette.primary as SimplePaletteColorOptions).main,
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          color: 'text.primary',
          variant: 'body3Poppins',
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              display: 'none',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            // backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&.MuiPopover-paper': {
              backgroundImage: 'none',
              // borderRadius: '12px'
            },
          },
        },
      },
      MuiStack: {
        defaultProps: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            '& .MuiBackdrop-root': {},
          },
        },
      },
    },
  } as ThemeOptions;
};

export const getTheme = (mode: 'light' | 'dark') => {
  if (mode === 'light')
    return createTheme({
      palette: lightPalette as any as PaletteOptions,
      ...(getComponentTheme(lightPalette) as any as ThemeOptions),
    });
  return createTheme({
    palette: darkPalette as any as PaletteOptions,
    ...(getComponentTheme(darkPalette) as any as ThemeOptions),
  });
};
