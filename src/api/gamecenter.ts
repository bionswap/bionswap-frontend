import { authRequest, request } from 'api';

export async function getHistoryGameSlot(chainId: string, wallet: string | undefined, filter: string) {
  const result = await authRequest.get('/game-slot/history', {
    params: {
      chainId: chainId,
      wallet: wallet,
      filter: filter,
    },
  });

  return result.data;
}
