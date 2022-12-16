import { Currency, Price } from "@bionswap/core-sdk";
import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {MdSwapHorizontalCircle} from 'react-icons/md'
import Image from "next/image"

type Props = {
  price?: Price<Currency, Currency>;
};

const TradePrice = ({ price }: Props) => {
  const [inverted, setInverted] = useState(false);

  const formattedPrice = inverted ? price?.invert()?.toSignificant(6) : price?.toSignificant(6);

  const labelInverted = inverted ? `${price?.baseCurrency?.symbol} ` : `${price?.quoteCurrency?.symbol}`;

  const label = inverted ? `${price?.quoteCurrency?.symbol}` : `${price?.baseCurrency?.symbol}`;

  return (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={() => setInverted(!inverted)}
        sx={{
          boxShadow: "none",
          padding: '0',
          gap: '10px',
          color: 'text.primary',
          "&:hover": {
            transform: "none",
            backgroundColor: "transparent",
          },
        }}
      >
        <Typography sx={{
          fontWeight: '500',
          color: 'inherit',
          fontSize: '14px'
        }}>
          {`1 ${label} = ${formattedPrice} ${labelInverted}`}
        </Typography>
        {/* <MdSwapHorizontalCircle/> */}
      </Button>
    </Stack>
  );
};

export default TradePrice;
