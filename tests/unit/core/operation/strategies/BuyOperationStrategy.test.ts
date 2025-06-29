import { OperationContext } from '../../../../../src/core/operation/OperationContext';
import { BuyOperationStrategy } from '../../../../../src/core/operation/strategies/BuyOperationStrategy';
import { Operation } from '../../../../../src/core/types';

describe('BuyOperationStrategy', () => {
  const strategy = new BuyOperationStrategy();

  it('should update context with correct totalStocks and averageStockPrice for first buy', () => {
    const context = new OperationContext();
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 10,
      quantity: 100,
    };

    const result = strategy.execute(operation, context);

    expect(result).toEqual({ tax: 0 });
    expect(context.totalStocks).toBe(100);
    expect(context.averageStockPrice).toBe(10);
    expect(context.accumulatedLoss).toBe(0);
  });

  it('should update averageStockPrice correctly for subsequent buys', () => {
    const context = new OperationContext(100, 10, 0);
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 20,
      quantity: 50,
    };

    const result = strategy.execute(operation, context);

    expect(result).toEqual({ tax: 0 });
    expect(context.totalStocks).toBe(150);
    expect(context.averageStockPrice).toBe(13.33);
    expect(context.accumulatedLoss).toBe(0);
  });

  it('should keep accumulatedLoss unchanged after buy', () => {
    const context = new OperationContext(10, 5, 123.45);
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 7,
      quantity: 5,
    };

    strategy.execute(operation, context);

    expect(context.accumulatedLoss).toBe(123.45);
  });

  it('should handle buy with zero quantity', () => {
    const context = new OperationContext(10, 10, 0);
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 20,
      quantity: 0,
    };

    strategy.execute(operation, context);

    expect(context.totalStocks).toBe(10);
    expect(context.averageStockPrice).toBe(10);
  });

  it('should round averageStockPrice to two decimals', () => {
    const context = new OperationContext(3, 10.333, 0);
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 20.555,
      quantity: 2,
    };

    strategy.execute(operation, context);

    expect(context.averageStockPrice).toBeCloseTo(14.42, 2);
  });
});