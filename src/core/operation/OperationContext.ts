/**
 * OperationContext class
 *
 * Maintains the state of stock operations, including:
 * - The total number of stocks (`totalStocks`)
 * - The average stock price (`averageStockPrice`)
 * - The accumulated loss (`accumulatedLoss`)
 *
 * @param totalStocks Initial total number of stocks (default: 0)
 * @param averageStockPrice Initial average stock price (default: 0)
 * @param accumulatedLoss Initial accumulated loss (default: 0)
 *
 * Provides methods to update and reset these values, supporting the management
 * of financial operations context.
 */

export class OperationContext {
  totalStocks: number;
  averageStockPrice: number;
  accumulatedLoss: number;

  constructor(totalStocks = 0, averageStockPrice = 0, accumulatedLoss = 0) {
    this.totalStocks = totalStocks;
    this.averageStockPrice = averageStockPrice;
    this.accumulatedLoss = accumulatedLoss;
  }

  update(
    updatedStocks: number,
    updatedAveragePrice: number,
    updatedLoss: number
  ) {
    this.totalStocks = updatedStocks;
    this.averageStockPrice = updatedAveragePrice;
    this.accumulatedLoss = updatedLoss;
  }

  reset() {
    this.totalStocks = 0;
    this.averageStockPrice = 0;
    this.accumulatedLoss = 0;
  }
}
