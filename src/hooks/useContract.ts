import WETH9_ABI from 'constants/abis/weth.json';
import ENS_ABI from 'constants/abis/ens-registrar.json';
import ERC20_ABI from 'constants/abis/erc20.json';
import ERC20_BYTES32_ABI from 'constants/abis/erc20_bytes32.json';
import MULTICALL_ABI from 'constants/abis/interface-multicall.json';
import PRESALE_FACTORY_ABI from 'constants/abis/presale-factory.json';
import PRESALE_ABI from 'constants/abis/presale.json';
import ROUTER_ABI from 'constants/abis/router.json';
import BION_LOCK_ABI from 'constants/abis/bion-lock.json';
import ENS_PUBLIC_RESOLVER_ABI from 'constants/abis/ens-public-resolver.json';
import STANDARD_TOKEN_ABI from 'constants/abis/standard-token.json';
import BION_AVATAR_ABI from 'constants/abis/bion-avatar.json';
import BION_GAME_SLOT_ABI from 'constants/abis/bion-game-slot.json';
import BION_TICKET_ABI from 'constants/abis/bion-ticket.json';
import TICKET_MACHINE_ABI  from 'constants/abis/ticket-machine.json';
import { Contract, ContractFactory } from 'ethers';
import { useAccount, useChain, useNetwork, useProvider, useSigner } from 'hooks';
import { useMemo } from 'react';
import { getContract, getContractFactory } from 'utils/contract';
import {
  ChainId,
  ENS_REGISTRAR_ADDRESS,
  MULTICALL2_ADDRESS,
  ROUTER_ADDRESS,
  WNATIVE_ADDRESS,
} from '@bionswap/core-sdk';
import {
  BION_AVATAR_ADDRESS,
  BION_LOCK_ADDRESS,
  BION_POWER_POOLS_ADDRESS,
  PRESALE_FACTORY_ADDRESS,
  BION_TICKET_ADDRESS,
  TICKET_MACHINE_ADDRESS,
} from 'constants/addresses';

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { chainId, signer, provider, account } = useChain();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null;
    let contractAddress: string | undefined;
    if (typeof addressOrAddressMap === 'string') contractAddress = addressOrAddressMap;
    else contractAddress = addressOrAddressMap[chainId];
    if (!contractAddress) return null;
    try {
      return getContract(contractAddress, ABI, withSignerIfPossible && account ? signer : provider);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account, signer]) as T;
}

export function useContractFactory<T extends ContractFactory = ContractFactory>(ABI: any, byteCode: string): T | null {
  const { signer } = useChain();
  return useMemo(() => {
    if (!ABI) return null;
    try {
      return getContractFactory(ABI, byteCode, signer);
    } catch (error) {
      console.error('Failed to get contract factory', error);
      return null;
    }
  }, [ABI, byteCode, signer]);
}

const MULTICALL_ADDRESS = {
  [ChainId.ETHEREUM]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.ROPSTEN]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.RINKEBY]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.GÖRLI]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.KOVAN]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.MATIC]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.MATIC_TESTNET]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.OPTIMISM]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.ARBITRUM]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [ChainId.MOONBEAM]: '0x34c471ddceb20018bbb73f6d13709936fc870acc',
  [ChainId.AVALANCHE]: '0x8C0F842791F03C095b6c633759224FcC9ACe68ea',
  [ChainId.BSC]: '0x47A307e3167820daf22a377D777371753758f59c',
  [ChainId.BSC_TESTNET]: '0xac309fc96d089fc3b92ef429caaa59902eab5d1c',
  [ChainId.FANTOM]: '0xB1395e098c0a847CC719Bcf1Fc8114421a9F8232',
  [ChainId.CELO]: '0x3d0B3b816DC1e0825808F27510eF7Aa5E3136D75',
  [ChainId.HARMONY]: '0xaAB49386BFcB605F853763Ea382B91C9c83b9Ac5',
  [ChainId.MOONRIVER]: '0x8C8BF5Dea280A1eC68219D66E8A21E60585830F5',
  [ChainId.XDAI]: '0x2B75358D07417D4e895c952Ca84A44E63AEBE3Dd',
  [ChainId.TELOS]: '0x64e1E895866B3126f8f2E2912B475FDB35b2F315',
  [ChainId.FUSE]: '0x393B6DC9B00E18314888678721eC0e923FC5f49D',
  [ChainId.OKEX]: '0x8C8BF5Dea280A1eC68219D66E8A21E60585830F5',
  [ChainId.HECO]: '0x64e1E895866B3126f8f2E2912B475FDB35b2F315',
  [ChainId.PALM]: '0x4d4A0D45a98AE8EC25b359D93A088A87BC9eF70b',
  [ChainId.KAVA]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
  [ChainId.METIS]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
};

export function useStandardTokenContractFactory() {
  return useContractFactory(STANDARD_TOKEN_ABI.abi, STANDARD_TOKEN_ABI.bytecode);
}

export function usePresaleFactoryContract() {
  return useContract(PRESALE_FACTORY_ADDRESS, PRESALE_FACTORY_ABI, true);
}

export function usePresaleContract(address: string | undefined) {
  return useContract(address, PRESALE_ABI, true);
}

export function useBionLockContract() {
  return useContract(BION_LOCK_ADDRESS, BION_LOCK_ABI, true);
}

export function useMulticallContract(): Contract | null | undefined {
  return useContract(MULTICALL_ADDRESS, MULTICALL_ABI, false);
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

// export function useEIP2612Contract(tokenAddress?: string): Contract | null {
//   return useContract(tokenAddress, EIP_2612_ABI, false);
// }

export function useRouterContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useChain();
  return useContract(ROUTER_ADDRESS[chainId], ROUTER_ABI, withSignerIfPossible);
}

export function useWETH9Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useChain();

  return useContract(chainId ? WNATIVE_ADDRESS[chainId] : undefined, WETH9_ABI, withSignerIfPossible);
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useChain();
  return useContract(chainId ? ENS_REGISTRAR_ADDRESS[chainId] : undefined, ENS_ABI, withSignerIfPossible);
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}

export function useBionAvatarContract() {
  return useContract(BION_AVATAR_ADDRESS, BION_AVATAR_ABI, true);
}

export function useBionGameSlotContract() {
  return useContract(BION_POWER_POOLS_ADDRESS.bionGameSlot, BION_GAME_SLOT_ABI, true);
}

export function useBionTicket() {
  return useContract(BION_TICKET_ADDRESS, BION_TICKET_ABI, true);
}

export function useTicketMachine() {
  return useContract(TICKET_MACHINE_ADDRESS, TICKET_MACHINE_ABI, true);
}
