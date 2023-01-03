import { Token } from "@bionswap/core-sdk";

export type Order = 'asc' | 'desc';

export interface LaunchpadTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: any;
  rowCount: number;
}

export interface TableProps {
  launchData: any;
  page:number,
  handleChangePagigation: any
}

export interface Data {
  name: string;
  status: string;
  total_raised: string;
  max_allocation: string;
  sale_price: string;
  end_date: number;
}

export function createData(
  name: string,
  status: string,
  total_raised: string,
  max_allocation: string,
  sale_price: string,
  end_date: number,
  quote_token: any
): Data {
  return {
    name,
    status,
    total_raised,
    max_allocation,
    sale_price,
    end_date,
  };
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
