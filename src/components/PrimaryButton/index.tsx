import { Button, ButtonProps, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface PrimaryButtonProps extends ButtonProps {
  label?: string;
  backgroundColor?: string;
  labelVariant?: TypographyProps["variant"];
  labelSx?: React.CSSProperties;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  color = "background.main",
  backgroundColor = "primary.main",
  variant = "contained",
  labelVariant,
  sx,
  labelSx,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        backgroundColor: variant === "outlined" ? "transparent" : backgroundColor,
        border: variant === "outlined" ? "1px solid #07E0E0" : "none",
        padding: "8px 20px",
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
      <Typography
        variant={labelVariant}
        color={variant === "outlined" ? "primary" : color}
        sx={{ ...(labelVariant ? {} : { fontSize: "16px", fontWeight: "500", lineHeight: "27px" }), ...labelSx }}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default PrimaryButton;
