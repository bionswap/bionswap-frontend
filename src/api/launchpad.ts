import { apiClient } from 'api';

export async function createPresale(payload: {
  chainId: number;
  owner: string;
  title: string;
  logo: string;
  banner: string;
  videoURL: string;
  website: string;
  socials: string;
  description: string;
  router: string;
  token: string;
  quoteToken: string;
  isQuoteETH: boolean;
  price: string;
  listingPrice: string;
  minPurchase: string;
  maxPurchase: string;
  startTime: number;
  endTime: number;
  lpPercent: number;
  softCap: string;
  hardCap: string;
  tgeDate: number;
  tgeReleasePercent: number;
  cycleDuration: number;
  cycleReleasePercent: number;
}) {
  const data = await apiClient.post<{ salt: string }>('launchpad/sale-info');

  return data.data;
}
