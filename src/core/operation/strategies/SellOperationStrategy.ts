import { OperationResult } from './../../types';
import { OperationStrategy } from '../OperationStrategy';
import { roundValue } from '../../../helpers/roundValue';
import { OperationContext } from '../OperationContext';
import { Operation } from '../../types';

/**
 * SellOperationStrategy implements the logic for processing a "sell" financial operation.
 * It calculates the profit, applies tax rules (including exemption limits and accumulated loss),
 * updates the total number of stocks, and keeps the average stock price unchanged.
 * 
 * @param taxFreeOperationLimit The minimum total sale value for tax exemption (default: 20000)
 * @param taxRate The tax rate applied to profits above the exemption limit (default: 0.2)
 */
export class SellOperationStrategy implements OperationStrategy {
  private readonly taxFreeOperationLimit: number;
  private readonly taxRate: number;

  constructor(taxFreeOperationLimit = 20000, taxRate = 0.2) {
    this.taxFreeOperationLimit = taxFreeOperationLimit;
    this.taxRate = taxRate;
  }

  execute(operation: Operation, context: OperationContext): OperationResult {
    const { quantity, 'unit-cost': unitCost } = operation;
    const { totalStocks, averageStockPrice, accumulatedLoss } = context;

    const totalCostBasis = quantity * averageStockPrice;
    const totalSaleValue = quantity * unitCost;
    const saleProfit = totalSaleValue - totalCostBasis;

    const taxAmount = this.calculateTax(totalSaleValue, saleProfit, accumulatedLoss);
    const updatedLoss = this.calculateAccumulatedLoss(totalSaleValue, saleProfit, accumulatedLoss);
    const updatedStocks = totalStocks - quantity;

    context.update(updatedStocks, averageStockPrice, updatedLoss)

    return {
      tax: roundValue(taxAmount)
    };
  }

  private calculateTax(
    totalSaleValue: number,
    saleProfit: number,
    accumulatedLoss: number
  ): number {
    if (this.shouldTax(totalSaleValue, saleProfit, accumulatedLoss)) {
      return (saleProfit - accumulatedLoss) * this.taxRate;
    }
    return 0;
  }

  private calculateAccumulatedLoss(
    totalSaleValue: number,
    saleProfit: number,
    accumulatedLoss: number
  ): number {
    if (this.shouldUpdateAccumulatedLoss(totalSaleValue, accumulatedLoss)) {
      return Math.max(0, accumulatedLoss - saleProfit);
    }
    return accumulatedLoss;
  }

  private shouldTax(
    totalSaleValue: number,
    saleProfit: number,
    accumulatedLoss: number
  ): boolean {
    return totalSaleValue > this.taxFreeOperationLimit && saleProfit - accumulatedLoss > 0;
  }

  private shouldUpdateAccumulatedLoss(
    totalSaleValue: number,
    accumulatedLoss: number
  ): boolean {
    return totalSaleValue > this.taxFreeOperationLimit || accumulatedLoss === 0;
  }
}
