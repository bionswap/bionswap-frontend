import React from "react";
import { Switch as MuiSwitch, SwitchProps, styled } from "@mui/material";

type Props = {};

const Switch = styled((props: SwitchProps) => (
  <MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 55,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(30px)",

      "& + .MuiSwitch-track": {
        backgroundColor: (theme.palette as any).extra.button.backgroundGreenOpacity,
        opacity: 1,
        border: 0,
        "&:before": {
          content: '"On"',
          color: theme.palette.primary.main,
          left: 10,
        },
        "&:after": {
          content: '""',
          color: theme.palette.text.secondary,
          right: 10,
        },
      },

      "& .MuiSwitch-thumb": {
        color: theme.palette.primary.main,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    color: (theme.palette as any).extra.card.hover,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: (theme.palette as any).extra.card.hover,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
    },
    "&:after": {
      content: '"Off"',
      color: theme.palette.text.secondary,
      right: 10,
    },
  },
}));

export default Switch;
