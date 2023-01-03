import { Box, IconButton, Modal, Stack, SxProps } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  sx?: SxProps;
};

const BaseModal = ({ children, open, onClose, sx }: Props|any) => {
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 300,
            bgcolor: theme => (theme.palette as any).extra.card.background,
            p: 0,
            borderRadius: '12px',
            ...sx,
          }}
        >
          {/* <IconButton onClick={onClose} sx={{ position: "absolute", top: 12, right: 12 }}>
            <CloseIcon />
          </IconButton> */}
          {children}
        </Box>
      </>
    </Modal>
  );
};

export default BaseModal;
