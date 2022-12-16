import { ChainId, Currency, WNATIVE } from '@bionswap/core-sdk';
import { Logo } from 'components';
import { WrappedTokenInfo } from 'blockChainEntities/WrappedTokenInfo';

import { useHttpLocations } from 'hooks';
import { FunctionComponent, useMemo } from 'react';

const BLOCKCHAIN = {
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.BSC]: 'binance',
  [ChainId.CELO]: 'celo',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.AVALANCHE_TESTNET]: 'fuji',
  [ChainId.FUSE]: 'fuse',
  [ChainId.HARMONY]: 'harmony',
  [ChainId.HECO]: 'heco',
  [ChainId.MATIC]: 'matic',
  [ChainId.MOONRIVER]: 'moonriver',
  [ChainId.OKEX]: 'okex',
  [ChainId.PALM]: 'palm',
  [ChainId.TELOS]: 'telos',
  [ChainId.XDAI]: 'xdai',
  [ChainId.ARBITRUM]: 'arbitrum',
  [ChainId.AVALANCHE]: 'avalanche',
  [ChainId.MOONBEAM]: 'moonbeam',
  // [ChainId.KAVA]: "kava",
  // [ChainId.METIS]: "metis",
  [ChainId.HARDHAT]: 'hardhat',
};

// @ts-ignore TYPE NEEDS FIXING
export const getCurrencyLogoUrls = (currency: Currency): string[] => {
  const urls: string[] = [];

  if (currency.chainId in BLOCKCHAIN) {
    urls.push(
      `https://raw.githubusercontent.com/sushiswap/logos/main/network/${
        BLOCKCHAIN[currency.chainId as keyof typeof BLOCKCHAIN]
      }/${currency.wrapped.address}.jpg`,
    );

    urls.push(
      `https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/network/${
        BLOCKCHAIN[currency.chainId as keyof typeof BLOCKCHAIN]
      }/${currency.wrapped.address}.jpg`,
    );

    urls.push(
      `https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/${
        BLOCKCHAIN[currency.chainId as keyof typeof BLOCKCHAIN]
      }/assets/${currency.wrapped.address}/logo.png`,
    );
    urls.push(
      // @ts-ignore TYPE NEEDS FIXING
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${
        BLOCKCHAIN[currency.chainId as keyof typeof BLOCKCHAIN]
      }/assets/${currency.wrapped.address}/logo.png`,
    );
  }
  return urls;
};

const AvalancheLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/avax.jpg';
const BinanceCoinLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png';
const EthereumLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png';
const FantomLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/ftm.jpg';
const HarmonyLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/one.jpg';
const HecoLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/heco.jpg';
const MaticLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png';
const MoonbeamLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/moonbeam.jpg';
const OKExLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/11132.png';
const xDaiLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/xdai.jpg';
const CeloLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/celo.jpg';
const PalmLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/palm.jpg';
const MovrLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/movr.jpg';
const FuseLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/fuse.jpg';
const TelosLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/telos.jpg';
const KavaLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/kava.svg';
const MetisLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/metis.svg';

const LOGO: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: EthereumLogo,
  [ChainId.KOVAN]: EthereumLogo,
  [ChainId.RINKEBY]: EthereumLogo,
  [ChainId.ROPSTEN]: EthereumLogo,
  [ChainId.GÖRLI]: EthereumLogo,
  [ChainId.FANTOM]: FantomLogo,
  [ChainId.FANTOM_TESTNET]: FantomLogo,
  [ChainId.MATIC]: MaticLogo,
  [ChainId.MATIC_TESTNET]: MaticLogo,
  [ChainId.XDAI]: xDaiLogo,
  [ChainId.BSC]: BinanceCoinLogo,
  [ChainId.BSC_TESTNET]: BinanceCoinLogo,
  [ChainId.MOONBEAM_TESTNET]: MoonbeamLogo,
  [ChainId.AVALANCHE]: AvalancheLogo,
  [ChainId.AVALANCHE_TESTNET]: AvalancheLogo,
  [ChainId.HECO]: HecoLogo,
  [ChainId.HECO_TESTNET]: HecoLogo,
  [ChainId.HARMONY]: HarmonyLogo,
  [ChainId.HARMONY_TESTNET]: HarmonyLogo,
  [ChainId.OKEX]: OKExLogo,
  [ChainId.OKEX_TESTNET]: OKExLogo,
  [ChainId.ARBITRUM]: EthereumLogo,
  [ChainId.ARBITRUM_TESTNET]: EthereumLogo,
  [ChainId.CELO]: CeloLogo,
  [ChainId.PALM]: PalmLogo,
  [ChainId.PALM_TESTNET]: PalmLogo,
  [ChainId.MOONRIVER]: MovrLogo,
  [ChainId.FUSE]: FuseLogo,
  [ChainId.TELOS]: TelosLogo,
  [ChainId.HARDHAT]: EthereumLogo,
  [ChainId.MOONBEAM]: MoonbeamLogo,
  [ChainId.OPTIMISM]: EthereumLogo,
  [ChainId.KAVA]: KavaLogo,
  [ChainId.METIS]: MetisLogo,
};

export interface CurrencyLogoProps {
  currency?: Currency;
  size?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

const CurrencyLogo: FunctionComponent<CurrencyLogoProps> = ({ currency, size = '24px' }) => {
  const uriLocations = useHttpLocations(
    currency instanceof WrappedTokenInfo ? currency.logoURI || currency.tokenInfo.logoURI : undefined,
  );
  const srcs: string[] = useMemo(() => {
    if (currency?.isNative || currency?.equals?.(WNATIVE[currency.chainId])) {
      return [LOGO[currency.chainId as keyof typeof LOGO]];
    }

    if (currency?.isToken) {
      const defaultUrls = [...getCurrencyLogoUrls(currency)];

      if (currency.name === 'OKT') {
        console.log('🚀 ~ file: index.tsx ~ line 136 ~ constsrcs:string[]=useMemo ~ defaultUrls', defaultUrls);
      }

      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls];
      }
      return defaultUrls;
    }

    return [];
  }, [currency, uriLocations]);

  return <Logo srcs={srcs} width={size} height={size} alt={currency?.symbol} />;
};

export default CurrencyLogo;
