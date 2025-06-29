import { OperationContext } from '../../../../../src/core/operation/OperationContext';
import { SellOperationStrategy } from '../../../../../src/core/operation/strategies/SellOperationStrategy';
import { Operation } from '../../../../../src/core/types';

describe('SellOperationStrategy', () => {
  const strategy = new SellOperationStrategy();

  it('should return zero tax for sell below exemption limit', () => {
    const context = new OperationContext(100, 10, 0);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 15 ,
      quantity: 50,
    };
    const result = strategy.execute(operation, context);
    expect(result).toEqual({ tax: 0 });
    expect(context.totalStocks).toBe(50);
    expect(context.averageStockPrice).toBe(10);
    expect(context.accumulatedLoss).toBe(0);
  });

  it('should calculate tax for sell above exemption limit with profit and no accumulated loss', () => {
    const context = new OperationContext(10000, 10, 0);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 20,
      quantity: 5000,
    };
    const result = strategy.execute(operation, context);
    // profit = (5000*20)-(5000*10) = 50000, tax = 50000*0.2 = 10000
    expect(result).toEqual({ tax: 10000 });
    expect(context.totalStocks).toBe(5000);
    expect(context.averageStockPrice).toBe(10);
    expect(context.accumulatedLoss).toBe(0);
  });

  it('should not tax if profit is zero even above exemption limit', () => {
    const context = new OperationContext(10000, 10, 0);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 10,
      quantity: 10000,
    };
    const result = strategy.execute(operation, context);
    expect(result).toEqual({ tax: 0 });
    expect(context.totalStocks).toBe(0);
    expect(context.accumulatedLoss).toBe(0);
  });

  it('should not tax if profit minus accumulated loss is zero or negative', () => {
    const context = new OperationContext(10000, 10, 100000);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 20,
      quantity: 5000,
    };
    const result = strategy.execute(operation, context);
    expect(result).toEqual({ tax: 0 });
    expect(context.totalStocks).toBe(5000);
    expect(context.accumulatedLoss).toBe(50000);
  });

  it('should update accumulatedLoss when above exemption limit and profit', () => {
    const context = new OperationContext(10000, 10, 5000);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 20,
      quantity: 5000,
    };
    strategy.execute(operation, context);
    expect(context.accumulatedLoss).toBe(0);
  });

  it('should keep accumulatedLoss unchanged if below exemption limit', () => {
    const context = new OperationContext(100, 10, 1000);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 100,
      quantity: 1,
    };
    strategy.execute(operation, context);
    expect(context.accumulatedLoss).toBe(1000);
  });

  it('should update accumulatedLoss to zero if profit is greater than accumulatedLoss', () => {
    const context = new OperationContext(10000, 10, 1000);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 20,
      quantity: 5000,
    };
    strategy.execute(operation, context);
    expect(context.accumulatedLoss).toBe(0);
  });

  it('should handle negative profit (loss) and not tax, but keep accumulatedLoss unchanged if below exemption', () => {
    const context = new OperationContext(100, 50, 0);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 10,
      quantity: 10,
    };
    const result = strategy.execute(operation, context);
    expect(result).toEqual({ tax: 0 });
    expect(context.accumulatedLoss).toBe(400);
  });

  it('should update stocks after sell', () => {
    const context = new OperationContext(10, 10, 0);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 20,
      quantity: 4,
    };
    strategy.execute(operation, context);
    expect(context.totalStocks).toBe(6);
  });
});
