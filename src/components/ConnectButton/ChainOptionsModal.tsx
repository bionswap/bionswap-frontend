import { Backdrop, Box, IconButton, MenuItem, MenuList, Modal, Stack , styled , Typography } from "@mui/material";
import { CHAIN_INFO_MAP } from "configs/chain";
import { useChain, useSwitchNetwork } from "hooks";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { getChainIcon } from "utils/chains";
import { Chain } from "wagmi";

type Props = {
  onChainSelected: (chain: Chain) => void;
  onClose?: () => void;
  open: boolean;
  onChainSwitched?: (chain: Chain) => void;
};

const ChainOptionsModal = ({ onClose, open = false, onChainSwitched }: Props) => {
  const { chainId, isConnected } = useChain();

  const { switchNetwork } = useSwitchNetwork({});

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
      <Wrapper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          color: "#fff",
          minWidth: "353px",
          maxWidth: "453px",
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "8px",
          p: 4,
        }}
      >
        <Box display="flex" flexDirection="column" gap="10px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant='h5Samsung' sx={{color: 'primary.main'}}>
              Connect a blockchain
            </Typography>
            <IconButton onClick={onClose}>
              <HiX />
            </IconButton>
          </Box>
          <Box color="#787A9B" fontSize="14px">
            Connect with one of our available blockchain providers.
          </Box>
        </Box>
        <Box mt="24px">
          <MenuList
            sx={{
              border: "1px solid #787A9B",
              borderRadius: "8px",
              padding: 0,
            }}
          >
            {Object.entries(CHAIN_INFO_MAP).map(([, chain]) => (
              <MenuItem
                sx={{
                  p: 2,
                  width: "100%",
                  borderBottom: "1px solid #787A9B",
                  ":last-child": {
                    borderBottom: "none",
                  },
                }}
                key={chain.id}
                onClick={() => {
                  // if (!selectToSwitch) {
                  //   setSelectedChain(chain);
                  //   onChainSelected(chain);
                  // } else {
                  //   switchNetwork?.(chain?.id);
                  // }
                  // setSelectedChain(chain);
                  // onChainSelected(chain);
                  switchNetwork?.(chain?.id);
                  // setSelectedChain(chain);
                  onChainSwitched?.(chain);
                }}
              >
                <Stack direction="row" justifyContent="space-between" width="100%">
                  <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
                    <Box display="flex" gap="10px" alignItems="center">
                      <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={24} height={24} />
                      <Box fontSize="16px" fontWeight={600}>
                        {chain.name}
                      </Box>
                    </Box>
                    {chain.id === chainId && isConnected && (
                      <StatusBox>
                        <div className="ring-container">
                          <div className="ringring" />
                          <div className="circle" />
                        </div>
                        <Box fontSize="12px" lineHeight="1" color="#787A9B">
                          Connected
                        </Box>
                      </StatusBox>
                    )}
                  </Box>
                </Stack>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled(Box)`
  background: ${(props:any) => (props.theme.palette as any).extra.card.background};
  border: 2px solid #014959;
`

const StatusBox = styled(Box)`
  display: flex;
  gap: 5px;
  align-items: center;
  position: relative;
  .circle {
    width: 12px;
    height: 12px;
    background-color: #07e0e0;
    border-radius: 50%;
    position: absolute;
    top: -1px;
    left: -15px;
  }
  .ringring {
    border: 2px solid #07e0e0;
    -webkit-border-radius: 30px;
    height: 22px;
    width: 22px;
    position: absolute;
    left: -19.5px;
    top: -6px;
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
    opacity: 0;
  }
  @-webkit-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }
`;

export default ChainOptionsModal;
