import {
  Currency,
  CurrencyAmount,
  JSBI,
  Percent,
  Token,
  Trade,
  TradeType,
} from "@bionswap/core-sdk";
import { ONE_HUNDRED_PERCENT, ZERO_PERCENT } from "constants/common";
import { BigNumber } from "ethers";

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
export function isTradeBetter(
  tradeA: Trade<Currency, Currency, TradeType> | undefined | null,
  tradeB: Trade<Currency, Currency, TradeType> | undefined | null,
  minimumDelta: Percent = ZERO_PERCENT
): boolean | undefined {
  if (tradeA && !tradeB) return false;
  if (tradeB && !tradeA) return true;
  if (!tradeA || !tradeB) return undefined;

  if (
    tradeA.tradeType !== tradeB.tradeType ||
    !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
    !tradeB.outputAmount.currency.equals(tradeB.outputAmount.currency)
  ) {
    throw new Error("Comparing incomparable trades");
  }

  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  } else {
    return tradeA.executionPrice.asFraction
      .multiply(minimumDelta.add(ONE_HUNDRED_PERCENT))
      .lessThan(tradeB.executionPrice);
  }
}

export function computeFiatValuePriceImpact(
  fiatValueInput: CurrencyAmount<Token> | undefined | null,
  fiatValueOutput: CurrencyAmount<Token> | undefined | null
): Percent | undefined {
  if (!fiatValueOutput || !fiatValueInput) return undefined;
  if (!fiatValueInput.currency.equals(fiatValueOutput.currency))
    return undefined;
  if (JSBI.equal(fiatValueInput.quotient, JSBI.BigInt(0))) return undefined;
  const pct = ONE_HUNDRED_PERCENT.subtract(
    fiatValueOutput.divide(fiatValueInput)
  );
  return new Percent(pct.numerator, pct.denominator);
}

// add 20%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}
