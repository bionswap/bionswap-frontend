import { TokenInfo, TokenList, Version } from "@uniswap/token-lists";
import schema from "@uniswap/token-lists/src/tokenlist.schema.json";
import Ajv from "ajv";
import { DEFAULT_LIST_OF_LISTS } from "configs/token-lists";
import { WrappedTokenInfo } from "blockChainEntities/WrappedTokenInfo";
import { ChainTokenMap, TokenAddressMap } from "state/lists/hooks";
import { contenthashToUri, uriToHttp } from "./convert";
import { parseENSAddress } from "./ens";

const tokenListValidator = new Ajv({ allErrors: true }).compile(schema);

type Mutable<T> = {
  -readonly [P in keyof T]: Mutable<T[P]>;
};

const mapCache = typeof WeakMap !== "undefined" ? new WeakMap<TokenList | TokenInfo[], ChainTokenMap>() : null;

export function tokensToChainTokenMap(tokens: TokenList | TokenInfo[]): ChainTokenMap {
  const cached = mapCache?.get(tokens);
  if (cached) return cached;

  const [list, infos] = Array.isArray(tokens) ? [undefined, tokens] : [tokens, tokens.tokens];
  const map = infos.reduce<Mutable<ChainTokenMap>>((map, info) => {
    const token = new WrappedTokenInfo(info, list);
    if (map[token.chainId]?.[token.address] !== undefined) {
      console.warn(`Duplicate token skipped: ${token.address}`);
      return map;
    }
    if (!map[token.chainId]) {
      map[token.chainId] = {};
    }
    map[token.chainId][token.address] = { token, list };
    return map;
  }, {}) as ChainTokenMap;
  mapCache?.set(tokens, map);
  return map;
}

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  typeof WeakMap !== "undefined" ? new WeakMap<TokenList, TokenAddressMap>() : null;

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list);
  if (result) return result;

  const map = list.tokens.reduce<TokenAddressMap>((tokenMap, tokenInfo) => {
    const token = new WrappedTokenInfo(tokenInfo, list);
    if (tokenMap[token.chainId]?.[token.address] !== undefined) {
      console.error(new Error(`Duplicate token! ${token.address}`));
      return tokenMap;
    }
    return {
      ...tokenMap,
      [token.chainId]: {
        ...tokenMap[token.chainId],
        [token.address]: {
          token,
          list,
        },
      },
    };
  }, {});
  listCache?.set(list, map);
  return map;
}

// const TRANSFORMED_DEFAULT_TOKEN_LIST = listToTokenMap(DEFAULT_TOKEN_LIST)

// const TRANSFORMED_CHAINLINK_TOKEN_LIST = listToTokenMap(CHAINLINK_TOKEN_LIST)

// export function useAllLists(): AppState['lists']['byUrl'] {
//   return useAppSelector((state) => state.lists.byUrl)
// }

/**
 * Combine the tokens in map2 with the tokens on map1, where tokens on map1 take precedence
 * @param map1 the base token map
 * @param map2 the map of additioanl tokens to add to the base map
 */
export function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
  const chainIds = Object.keys(
    Object.keys(map1)
      .concat(Object.keys(map2))
      .reduce<{ [chainId: string]: true }>((memo, value) => {
        memo[value] = true;
        return memo;
      }, {})
  ).map((id) => parseInt(id));

  return chainIds.reduce<Mutable<TokenAddressMap>>((memo, chainId) => {
    memo[chainId] = {
      ...map2[chainId],
      // map1 takes precedence
      ...map1[chainId],
    };
    return memo;
  }, {}) as TokenAddressMap;
}

// function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
//   return {
//     1: { ...map1[1], ...map2[1] }, // mainnet
//     3: { ...map1[3], ...map2[3] }, // ropsten
//     4: { ...map1[4], ...map2[4] }, // rinkeby
//     5: { ...map1[5], ...map2[5] }, // goerli
//     42: { ...map1[42], ...map2[42] }, // kovan
//     250: { ...map1[250], ...map2[250] }, // fantom
//     4002: { ...map1[4002], ...map2[4002] }, // fantom testnet
//     137: { ...map1[137], ...map2[137] }, // matic
//     80001: { ...map1[80001], ...map2[80001] }, // matic testnet
//     100: { ...map1[100], ...map2[100] }, // xdai
//     56: { ...map1[56], ...map2[56] }, // bsc
//     97: { ...map1[97], ...map2[97] }, // bsc testnet
//     42161: { ...map1[42161], ...map2[42161] }, // arbitrum
//     79377087078960: { ...map1[79377087078960], ...map2[79377087078960] }, // arbitrum testnet
//     1287: { ...map1[1287], ...map2[1287] }, // moonbase
//     128: { ...map1[128], ...map2[128] }, // heco
//     256: { ...map1[256], ...map2[256] }, // heco testnet
//     43114: { ...map1[43114], ...map2[43114] }, // avax mainnet
//     43113: { ...map1[43113], ...map2[43113] }, // avax testnet fuji
//     1666600000: { ...map1[1666600000], ...map2[1666600000] }, // harmony
//     1666700000: { ...map1[1666700000], ...map2[1666700000] }, // harmony testnet
//     66: { ...map1[66], ...map2[66] }, // okex
//     65: { ...map1[65], ...map2[65] }, // okex testnet
//     42220: { ...map1[42220], ...map2[42220] }, // celo
//     11297108109: { ...map1[11297108109], ...map2[11297108109] }, // palm
//     11297108099: { ...map1[11297108099], ...map2[11297108099] }, // palm testnet
//     1285: { ...map1[1285], ...map2[1285] }, // moonriver
//     122: { ...map1[122], ...map2[122] }, // fuse
//     40: { ...map1[40], ...map2[40] }, // telos
//     1284: { ...map1[1284], ...map2[1284] }, // moonbeam
//   }
// }

// merge tokens contained within lists from urls
// function useCombinedTokenMapFromUrls(urls: string[] | undefined): TokenAddressMap {
//   const lists = useAllLists()
//   return useMemo(() => {
//     if (!urls) return {}
//     return (
//       urls
//         .slice()
//         // sort by priority so top priority goes last
//         .sort(sortByListPriority)
//         .reduce((allTokens, currentUrl) => {
//           const current = lists[currentUrl]?.current
//           if (!current) return allTokens
//           try {
//             return combineMaps(allTokens, listToTokenMap(current))
//           } catch (error) {
//             console.error('Could not show token list due to error', error)
//             return allTokens
//           }
//         }, {})
//     )
//   }, [lists, urls])
// }

// use ordering of default list of lists to assign priority
export function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER;
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER;

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1;
  else if (first > second) return -1;
  return 0;
}

/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */
export async function getTokenList(
  listUrl: string,
  resolveENSContentHash: (ensName: string) => Promise<string>
): Promise<TokenList> {
  const parsedENS = parseENSAddress(listUrl);
  let urls: string[];
  if (parsedENS) {
    let contentHashUri;
    try {
      contentHashUri = await resolveENSContentHash(parsedENS.ensName);
    } catch (error) {
      console.debug(`Failed to resolve ENS name: ${parsedENS.ensName}`, error);
      throw new Error(`Failed to resolve ENS name: ${parsedENS.ensName}`);
    }
    let translatedUri;
    try {
      translatedUri = contenthashToUri(contentHashUri);
    } catch (error) {
      console.debug("Failed to translate contenthash to URI", contentHashUri);
      throw new Error(`Failed to translate contenthash to URI: ${contentHashUri}`);
    }
    urls = uriToHttp(`${translatedUri}${parsedENS.ensPath ?? ""}`);
  } else {
    urls = uriToHttp(listUrl);
  }
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const isLast = i === urls.length - 1;
    let response;
    try {
      response = await fetch(url);
    } catch (error) {
      console.debug("Failed to fetch list", listUrl, error);
      if (isLast) throw new Error(`Failed to download list ${listUrl}`);
      continue;
    }

    if (!response.ok) {
      if (isLast) throw new Error(`Failed to download list ${listUrl}`);
      continue;
    }

    const json = await response.json();
    if (!tokenListValidator(json)) {
      const validationErrors: string =
        tokenListValidator.errors?.reduce<string>((memo, error) => {
          const add = `${error.dataPath} ${error.message ?? ""}`;
          return memo.length > 0 ? `${memo}; ${add}` : `${add}`;
        }, "") ?? "unknown error";
      throw new Error(`Token list failed validation: ${validationErrors}`);
    }
    return json as any;
  }
  throw new Error("Unrecognized list URL protocol.");
}

export function listVersionLabel(version: Version): string {
  return `v${version.major}.${version.minor}.${version.patch}`;
}
