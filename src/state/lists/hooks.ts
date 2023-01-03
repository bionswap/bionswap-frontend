// import UNSUPPORTED_TOKEN_LIST from "app/constants/token-lists/sushiswap-v2-unsupported.tokenlist.json";
import { ChainId } from "@bionswap/core-sdk";
import { TokenList } from "@uniswap/token-lists";
import { UNSUPPORTED_LIST_URLS } from "configs/token-lists";
import { WrappedTokenInfo } from "bionswap-entities/WrappedTokenInfo";
import { useChain, useNetwork, useProvider } from "hooks";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { AppState, useAppDispatch, useAppSelector } from "state";
import { resolveENSContentHash } from "utils/ens";
import {
  combineMaps,
  getTokenList,
  sortByListPriority,
  tokensToChainTokenMap,
} from "utils/lists";
import { fetchTokenList } from "./actions";

type TokenMap = Readonly<{
  [tokenAddress: string]: { token: WrappedTokenInfo; list?: TokenList };
}>;
export type ChainTokenMap = Readonly<{ [chainId: number]: TokenMap }>;
export type TokenAddressMap = ChainTokenMap;

export function useAllLists(): AppState["lists"]["byUrl"] {
  return useAppSelector((state) => state.lists.byUrl);
}

// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(
  urls: string[] | undefined
): TokenAddressMap {
  const lists = useAllLists();
  return useMemo(() => {
    if (!urls) return {};
    return (
      urls
        .slice()
        // sort by priority so top priority goes last
        .sort(sortByListPriority)
        .reduce((allTokens, currentUrl) => {
          const current = lists[currentUrl]?.current;

          if (!current) return allTokens;
          try {
            return combineMaps(allTokens, tokensToChainTokenMap(current));
          } catch (error) {
            console.error("Could not show token list due to error", error);
            return allTokens;
          }
        }, {})
    );
  }, [lists, urls]);
}

// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
  const activeListUrls = useAppSelector((state) => state.lists.activeListUrls);
  return useMemo(
    () => activeListUrls?.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url)),
    [activeListUrls]
  );
}

export function useInactiveListUrls(): string[] {
  const lists = useAllLists();
  const allActiveListUrls = useActiveListUrls();
  return useMemo(
    () =>
      Object.keys(lists).filter(
        (url) =>
          !allActiveListUrls?.includes(url) &&
          !UNSUPPORTED_LIST_URLS.includes(url)
      ),
    [lists, allActiveListUrls]
  );
}

// get all the tokens from active lists, combine with local default tokens
// export function useCombinedActiveList(): TokenAddressMap {
//   const activeListUrls = useActiveListUrls()
//   const activeTokens = useCombinedTokenMapFromUrls(activeListUrls)
//   return useMemo(
//     () => combineMaps(combineMaps(activeTokens, TRANSFORMED_DEFAULT_TOKEN_LIST), TRANSFORMED_CHAINLINK_TOKEN_LIST),
//     [activeTokens]
//   )
// }

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  const activeListUrls = useActiveListUrls();
  const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
  return activeTokens;
}

// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList(): TokenAddressMap {
  // get hard coded unsupported tokens
  //   const localUnsupportedListMap = listToTokenMap(UNSUPPORTED_TOKEN_LIST);

  //   // get any loaded unsupported tokens
  //   const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(
  //     UNSUPPORTED_LIST_URLS
  //   );

  // format into one token address map
  //   return useMemo(
  //     () => combineMaps(localUnsupportedListMap, loadedUnsupportedListMap),
  //     [localUnsupportedListMap, loadedUnsupportedListMap]
  //   );
  return useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS);
}

export function useIsListActive(url: string): boolean {
  const activeListUrls = useActiveListUrls();
  return Boolean(activeListUrls?.includes(url));
}

export function useFetchListCallback(): (
  listUrl: string,
  sendDispatch?: boolean
) => Promise<TokenList> {
  const { chainId, provider: library } = useChain();

  const dispatch = useAppDispatch();

  const ensResolver = useCallback(
    (ensName: string) => {
      if (!library || chainId !== ChainId.ETHEREUM) {
        throw new Error("Could not construct mainnet ENS resolver");
      }
      return resolveENSContentHash(ensName, library);
    },
    [chainId, library]
  );

  // note: prevent dispatch if using for list search or unsupported list
  return useCallback(
    async (listUrl: string, sendDispatch = true) => {
      const requestId = nanoid();
      sendDispatch &&
        dispatch(fetchTokenList.pending({ requestId, url: listUrl }));
      return getTokenList(listUrl, ensResolver)
        .then((tokenList) => {
          sendDispatch &&
            dispatch(
              fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId })
            );
          return tokenList;
        })
        .catch((error) => {
          console.debug(`Failed to get list at url ${listUrl}`, error);
          sendDispatch &&
            dispatch(
              fetchTokenList.rejected({
                url: listUrl,
                requestId,
                errorMessage: error.message,
              })
            );
          throw error;
        });
    },
    [dispatch, ensResolver]
  );
}
