import { Token } from "@bionswap/core-sdk";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, IconButton, Link, Stack, styled, Typography } from "@mui/material";
import CurrencyLogo from "components/CurrencyLogo";
import { useChain } from "hooks";
import { useAddUserToken } from "state/user/hooks";
import { getExplorerLink } from "utils/explorer";
import { shortenAddress } from "utils/format";
import { ManageCurrencyListModalView, useManageCurrencyListModalContext } from ".";

type Props = { tokens: Token[]; onBack?: () => void };

const ImportToken = ({ tokens, onBack }: Props) => {
  const { chainId } = useChain();
  // const router = useRouter();
  // const queryChainId = Number(router.query.chainId);
  const { onSelect, importToken, setView } = useManageCurrencyListModalContext();
  const addToken = useAddUserToken();
  // const importList = importToken instanceof WrappedTokenInfo ? importToken.list : undefined;

  return (
    <Stack>
      <Stack direction="row" justifyContent="center" width="100%" gap={1} position='relative' padding='25px 15px 20px' >
        <IconButton onClick={onBack} sx={{
          position: 'absolute',
          left: '15px'
        }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6Poppins" color='text.primary' fontWeight='400'>
          Import
        </Typography>
      </Stack>
      <Stack width="100%" gap={2} sx={{
        borderTop: '1px solid',
        borderTopColor: theme => (theme.palette as any).extra.card.divider
      }}>
        <Stack padding='15px'>
          <WrapWarningNotice mb='15px'>
            <img src='/images/warning.png' alt="warning" />
            <Typography variant="captionPoppins" color='gray.300' textAlign='center' fontWeight='400'>
              This token does not appear on the active token list(s). Make sure this is the token that you want to trade.
            </Typography>
          </WrapWarningNotice>
          {/* <Stack>
            {tokens.map((token) => (
              <Stack key={token.address} direction="row" gap={1}>
                <CurrencyLogo currency={token} size={48} />
                <Stack alignItems="start">
                  <Stack direction="row" gap={1}>
                    <Typography>{token.symbol}</Typography>
                    <Stack sx={{ bgcolor: "secondary.main", borderRadius: 8, px: 1 }}>
                      <Typography variant="caption">Unknown source</Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <Typography>{token.name}</Typography>
                    <Link
                      href={getExplorerLink(chainId, token.address, "address")}
                      underline="none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography color="primary">{shortenAddress(token.address)}</Typography>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack> */}
          {
            tokens.map((token) => (
              <Stack key={token.address} direction="row" justifyContent="space-between" width="100%" mb='33px'>
                <Stack direction="row">
                  <CurrencyLogo currency={token} size='26px' />
                  <Stack sx={{ ml: '10px', alignItems: "flex-start" }}>
                    <Stack direction="row" gap='4px'>
                      <Typography variant="body4Poppins" color='text.primary' fontWeight='500'>
                        {token.symbol}
                      </Typography>
                      <Typography variant="body6Poppins" color='#9A6AFF' fontWeight='500'>
                        {token.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body4Poppins" color='#717D8A' fontWeight='400'>
                      Unknown Source
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <Link
                    href={getExplorerLink(chainId, token.address, "address")}
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/Launch_1.png" alt="Launch_1" />
                  </Link>
                </Box>
              </Stack>
            ))
          }

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              tokens.map((token) => addToken(token));
              onSelect && onSelect(tokens[0]);
              setView(ManageCurrencyListModalView.search);
            }}
          >
            <Typography variant="body4Poppins" color="#000607" fontWeight='600'>Import</Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const WrapWarningNotice = styled(Box)`
  background: rgba(255, 178, 30, 0.05);
  border: 1px solid #FBB03B;
  border-radius: 8px;
  padding: 10px 21px;
  flex-direction: column;
  display: flex;
  gap: 10px;
  align-items: center;
`

export default ImportToken;
