import { OperationStrategy } from '../../../../src/core/operation/OperationStrategy';
import { OperationContext } from '../../../../src/core/operation/OperationContext';
import { Operation, OperationResult } from '../../../../src/core/types';

class DummyStrategy implements OperationStrategy {
  execute(operation: Operation, context: OperationContext): OperationResult {
    if (operation.operation === 'buy') return { tax: 0 };
    return { 
      tax: context.totalStocks * operation['unit-cost'] * 0.2
    };
  }
}

describe('OperationStrategy', () => {
  it('should allow implementing dummy strategy to buy execution', () => {
    const strategy = new DummyStrategy();
    const context = new OperationContext(0, 0, 0);
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 100,
      quantity: 3,
    };

    const result = strategy.execute(operation, context);

    expect(result).toEqual({ tax: 0 });
  });

  it('should allow implementing dummy strategy to sell execution', () => {
    const strategy = new DummyStrategy();
    const context = new OperationContext(10, 0, 0);
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 50,
      quantity: 10,
    };

    const result = strategy.execute(operation, context);

    expect(result).toEqual({ tax: 100 });
  });
});