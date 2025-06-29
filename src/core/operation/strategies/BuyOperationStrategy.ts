import { OperationStrategy } from '../OperationStrategy';
import { roundValue } from '../../../helpers/roundValue';
import { OperationContext } from '../OperationContext';
import { Operation, OperationResult } from '../../types';

/**
 * BuyOperationStrategy implements the logic for processing a "buy" financial operation.
 * When a buy operation is executed, it updates the total number of stocks and recalculates the average stock price.
 * No tax is applied to buy operations.
 */
export class BuyOperationStrategy implements OperationStrategy {
  execute(operation: Operation, context: OperationContext): OperationResult {
    const { quantity, 'unit-cost': unitCost } = operation;
    const { totalStocks, averageStockPrice, accumulatedLoss } = context;

    const newAveragePrice = this.calculateNewAveragePrice(
      totalStocks,
      averageStockPrice,
      quantity,
      unitCost
    );
    const newTotalStocks = totalStocks + quantity;

    context.update(newTotalStocks, newAveragePrice, accumulatedLoss);

    return { tax: 0 };
  }

  private calculateNewAveragePrice(
    totalStocks: number,
    currentAveragePrice: number,
    purchasedQuantity: number,
    purchasePrice: number
  ): number {
    if (!totalStocks) return purchasePrice;

    const totalValueBefore = totalStocks * currentAveragePrice;
    const totalValuePurchased = purchasedQuantity * purchasePrice;
    const totalQuantityAfter = totalStocks + purchasedQuantity;

    const newAverage =
      (totalValueBefore + totalValuePurchased) / totalQuantityAfter;
    return roundValue(newAverage);
  }
}
