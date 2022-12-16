import { Currency, Token } from "@bionswap/core-sdk";
import { TokenList } from "@uniswap/token-lists";
import { BaseModal } from "components";
import { usePrevious } from "hooks";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import CurrencySearch from "./CurrencySearch";
import ImportList from "./ImportList";
import ImportToken from "./ImportToken";
import Manage from "./Manage";

export enum ManageCurrencyListModalView {
  search,
  manage,
  importToken,
  importList,
}

interface ManageCurrencyListModalContext {
  view: ManageCurrencyListModalView;
  setView(x: ManageCurrencyListModalView): void;
  importToken?: Token;
  setImportToken(x: Token): void;
  onDismiss(): void;
  onSelect(x: Currency): void;
  currency?: Currency;
  includeNative?: boolean;
  importList?: TokenList;
  setImportList(x: TokenList): void;
  listUrl?: string;
  setListUrl(x: string): void;
  showSearch?: boolean;
}

const ManageCurrencyListModalContext = createContext<ManageCurrencyListModalContext>({
  view: ManageCurrencyListModalView.search,
  setView: () => {},
  importToken: undefined,
  setImportToken: () => {},
  onDismiss: () => {},
  onSelect: () => {},
  currency: undefined,
  includeNative: true,
  importList: undefined,
  setImportList: () => {},
  listUrl: undefined,
  setListUrl: () => {},
  showSearch: true,
});

export const useManageCurrencyListModalContext = () => useContext(ManageCurrencyListModalContext);

interface ManageCurrencyListModalProps {
  open: boolean;
  onDismiss: () => void;
  selectedCurrency?: Currency;
  onCurrencySelect: (currency: Currency) => void;
  otherSelectedCurrency?: Currency;
  showCommonBases?: boolean;
  currencyList?: (string | undefined)[];
  includeNativeCurrency?: boolean;
  allowManageTokenList?: boolean;
  showSearch?: boolean;
}

const ManageCurrencyListModal = ({
  open,
  onDismiss,
  onCurrencySelect,
  allowManageTokenList,
  currencyList,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases,
  includeNativeCurrency,
  showSearch,
}: ManageCurrencyListModalProps) => {
  const [view, setView] = useState<ManageCurrencyListModalView>(ManageCurrencyListModalView.search);
  const prevView = usePrevious(view);
  const [importToken, setImportToken] = useState<Token | undefined>();
  const [importList, setImportList] = useState<TokenList | undefined>();
  const [listUrl, setListUrl] = useState<string | undefined>();

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency);
      onDismiss();
    },
    [onDismiss, onCurrencySelect]
  );

  return (
    <ManageCurrencyListModalContext.Provider
      value={useMemo(
        () => ({
          view,
          setView,
          importToken,
          setImportToken,
          importList,
          setImportList,
          onDismiss,
          onSelect: handleCurrencySelect,
          currency: selectedCurrency,
          includeNative: includeNativeCurrency,
          listUrl,
          setListUrl,
          showSearch,
        }),
        [
          handleCurrencySelect,
          importList,
          importToken,
          includeNativeCurrency,
          listUrl,
          onDismiss,
          selectedCurrency,
          showSearch,
          view,
        ]
      )}
    >
      <BaseModal
        open={open}
        onClose={onDismiss}
        sx={{ 
          backgroundColor: (theme:any) => (theme.palette as any).extra.swapPanel.background, 
          maxWidth: "500px",
          minWidth: '200px',
          width: '90vw',
          borderRadius: '12px',
        }}
      >
        {view === ManageCurrencyListModalView.search ? (
          <CurrencySearch
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            currencyList={currencyList}
            allowManageTokenList={allowManageTokenList}
          />
        ) : view === ManageCurrencyListModalView.importToken && importToken ? (
          <ImportToken
            tokens={[importToken]}
            onBack={() =>
              setView(
                prevView && prevView !== ManageCurrencyListModalView.importToken
                  ? prevView
                  : ManageCurrencyListModalView.search
              )
            }
          />
        ) : view === ManageCurrencyListModalView.importList && importList && listUrl ? (
          <ImportList />
        ) : view === ManageCurrencyListModalView.manage ? (
          <Manage />
        ) : (
          <></>
        )}
      </BaseModal>
    </ManageCurrencyListModalContext.Provider>
  );
};

export default ManageCurrencyListModal;
