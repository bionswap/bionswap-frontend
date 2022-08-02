/* eslint-disable @next/next/no-img-element */
import {
  Backdrop,
  Box,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Modal,
  Skeleton,
} from "@mui/material";
import { useBalance } from "hooks";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { useAccount, useDisconnect } from "wagmi";
import styled from "@emotion/styled";
import { getConnectorIcon } from "utils/connectors";
import { shortenAddress } from "utils/format";

type Props = {
  onClose?: () => void;
  open: boolean;
};

const ProfileModal = ({ onClose, open = false }: Props) => {
  const { address, connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useBalance({
    addressOrName: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  });

  return (
    <Modal
      onClose={onClose}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          bgcolor: "#fff",
          boxShadow: 24,
          borderRadius: "8px",
          minWidth: "453px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          p: 4,
        }}
      >
        <Box display="flex" flexDirection="column" gap="5px">
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box
              display="flex"
              alignItems="center"
              gap="10px"
              fontSize="18px"
              fontWeight="700"
            >
              <Image
                src={
                  activeConnector ? getConnectorIcon(activeConnector.id) : "/"
                }
                layout="fixed"
                alt=""
                width={40}
                height={40}
              />
              <Box>
                {shortenAddress(address ?? "")}
                <Box color="#787A9B" fontWeight="400" fontSize="14px">
                  {activeConnector ? activeConnector.name : <Skeleton />}
                </Box>
              </Box>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{ color: "#0b0b0b", padding: "0" }}
            >
              <HiX />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ borderBottom: "1px solid #787A9B" }} />
        <Box>
          <WrapCard>
            <Box>
              <Content>Your Balance</Content>
              <Title>5.938200193 BNB</Title>
            </Box>
            <Box marginTop="10px">
              <Content>Bion Stacks</Content>
              <Title>0.00</Title>
            </Box>
            <BgImage>
              <img src="/images/Fox_bg.png" alt="Fox_bg" />
            </BgImage>
          </WrapCard>
        </Box>
        <MenuList
          sx={{
            padding: 0,
          }}
          onClick={onClose}
        >
          <MenuItem
            sx={{
              p: 2,
              width: "100%",
              borderBottom: "1px solid #787A9B",
              ":last-child": {
                borderBottom: "none",
              },
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            sx={{
              p: 2,
              width: "100%",
              borderBottom: "1px solid #787A9B",
              ":last-child": {
                borderBottom: "none",
              },
            }}
          >
            My collections
          </MenuItem>
          <MenuItem
            sx={{
              p: 2,
              width: "100%",
              borderBottom: "1px solid #787A9B",
              ":last-child": {
                borderBottom: "none",
              },
            }}
          >
            Setting
          </MenuItem>
          <MenuItem
            sx={{
              p: 2,
              width: "100%",
              borderBottom: "1px solid #787A9B",
              ":last-child": {
                borderBottom: "none",
              },
            }}
            onClick={() => disconnect()}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Box>
    </Modal>
  );
};

const WrapCard = styled(Box)`
  background: linear-gradient(
      159.48deg,
      rgba(231, 162, 54, 0.2) 8.56%,
      rgba(231, 162, 54, 2e-5) 91.52%
    ),
    #787a9b;
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;
const Title = styled(Box)`
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  font-family: "Inter", sans-serif;
  color: #fff;
`;
const Content = styled(Box)`
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  color: #fff;
`;
const BgImage = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
`;

export default ProfileModal;
