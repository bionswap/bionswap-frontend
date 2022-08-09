import { createTheme, PaletteOptions, SimplePaletteColorOptions, ThemeOptions } from "@mui/material";

type ExtraThemeProp = { [any: string]: string | ExtraThemeProp };
type ExtendedPaletteOptions = PaletteOptions & {
  extra?: ExtraThemeProp;
};

export const lightPalette: ExtendedPaletteOptions = {
  mode: "light",
  primary: {
    main: "#E7A236",
    light: "#ffc107",
    dark: "#FB8500",
  },
  secondary: {
    main: "#25273d",
  },
  background: {
    default: "#FAFAFA",
    paper: "#FFFFFF",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "#7A858C",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  error: {
    main: "#EB5757",
  },
  warning: {
    main: "rgba(255, 178, 55, 0.2)",
  },
  // info: {},
  // success: {
  //   // main: "green",
  // },
  // divider: {}
  extra: {
    button: {
      background: "#25273D",
      text: "white",
    },
    swapButton: {
      background: '#07E0E0',
      color: '#000607'
    },
    header: {
      background: '#ffffff',
      color: '#787A9B',
      colorActive: '#0b0b0b'
    },
    input: {
      background: '#FFFFFF',
      color: "#000000"
    }
  },
};

export const darkPalette: ExtendedPaletteOptions = {
  mode: "dark",
  primary: {
    main: "#07E0E0",
    light: "#ffc107",
    dark: "#000A0D",
  },
  secondary: {
    main: "#25273d",
  },
  background: {
    default: "#000A0D",
    paper: "#424242",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B9B9B9",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
  // error: {},
  // warning: {},
  // info: {},
  // success: {},
  // divider: {}
  extra: {
    button: {
      background: "white",
      text: "black",
    },
    swapButton: {
      background: '#07E0E0',
      color: '#000607'
    },
    header: {
      background: '#081319',
      color: '#A8B0B9',
      colorActive: '#F8F9F9'
    },
    input: {
      background: '#001519',
      color: "#F8F9F9"
    },
    border: {
      color: '#424242'
    }
  },
};

const getComponentTheme = (basePalette: ExtendedPaletteOptions): ThemeOptions => {
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
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
          variant: "text",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            // "&:hover": {
            //   transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
            // },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          // root: {
          //   width: "100%",
          //   p: 1.5,
          //   borderRadius: "8px",
          //   "&.Mui-selected": {
          //     backgroundColor: (
          //       basePalette.primary as SimplePaletteColorOptions
          //     ).light,
          //     boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.24)",
          //     "&:hover": {
          //       backgroundColor: (
          //         basePalette.primary as SimplePaletteColorOptions
          //       ).light,
          //     },
          //   },
          //   "& .MuiTouchRipple-root": {
          //     color: (basePalette.primary as SimplePaletteColorOptions).main,
          //   },
          // },
        },
      },
      MuiTypography: {
        defaultProps: {
          color: "text.primary",
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 14,
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              display: "none",
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
      MuiStack: {
        defaultProps: {
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
  };
};

export const getTheme = (mode: "light" | "dark") => {
  if (mode === "light")
    return createTheme({
      palette: lightPalette,
      ...getComponentTheme(lightPalette),
    });
  return createTheme({
    palette: darkPalette,
    ...getComponentTheme(darkPalette),
  });
};
