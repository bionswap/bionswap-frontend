import { LoadingButton } from "@mui/lab";
import { Button, ButtonProps, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface PrimaryButtonProps extends ButtonProps {
  children: any;
  backgroundColor?: string;
  isLoading?: boolean;
}

const PrimaryLoadingButton: React.FC<PrimaryButtonProps> = ({
  children,
  backgroundColor = "primary.main",
  variant = "contained",
  sx,
  isLoading = false,
  ...rest
}) => {
  return (
    <LoadingButton
      variant={variant}
      loading={isLoading}
      sx={{
        backgroundColor: variant === "outlined" ? "transparent" : backgroundColor,
        border: variant === "outlined" ? "1px solid #07E0E0" : "none",
        padding: "5px",
        width: "100%",
        transition: "all .3s ease",
        cursor: "pointer",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: variant === "outlined" ? "transparent" : backgroundColor,
          opacity: 0.9,
        },
        ...sx,
      }}
      {...rest}
    >
      {isLoading ? null : children}
    </LoadingButton>
  );
};

export default PrimaryLoadingButton;