import { authRequest, request } from 'api';

export async function getDiscount(wallet: string|undefined) {
  const result = await request.get('/ticket/discount', {
    params: {
      wallet: wallet,
    },
  });

  return result.data.data;
}

export async function buyBySig(chainId: number, currency: string, wallet: string | undefined, amount: number) {
  const result = await authRequest.post('/ticket/buy-by-sig', {
    chainId: Number(chainId),
    currency: String(currency),
    wallet: String(wallet),
    amount: Number(amount),
  });

  return result.data.data;
}
