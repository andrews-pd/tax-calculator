import { OperationContext } from '../../../../src/core/operation/OperationContext';
import { OperationHandler } from '../../../../src/core/operation/OperationHandler';
import { OperationStrategy } from '../../../../src/core/operation/OperationStrategy';
import { Operation, OperationResult } from '../../../../src/core/types';
import { UnsupportedOperationTypeError } from '../../../../src/core/errors/UnsupportedOperationTypeError';

class DummyStrategy implements OperationStrategy {
  execute(operation: Operation, context: OperationContext): OperationResult {
    if (operation.operation === 'buy') return { tax: 0 };
    return { 
      tax: context.totalStocks * operation['unit-cost'] * 0.2
    };
  }
}

describe('OperationHandler', () => {
  let handler: OperationHandler;
  let context: OperationContext;

  beforeEach(() => {
    handler = new OperationHandler({
      buy: new DummyStrategy(),
      sell: new DummyStrategy(),
    });
    context = new OperationContext(100, 10, 0);
  });

  it('should delegate to the correct strategy for "buy"', () => {
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 10,
      quantity: 5,
    };
    const result = handler.processOperation(operation, context);
    expect(result).toEqual({ tax: 0 });
  });

  it('should delegate to the correct strategy for "sell"', () => {
    const operation: Operation = {
      operation: 'sell',
      'unit-cost': 20,
      quantity: 3,
    };
    const result = handler.processOperation(operation, context);
    expect(result).toEqual({ tax: 400 });
  });

  it('should throw UnsupportedOperationTypeError for unknown operation', () => {
    const handler = new OperationHandler({
      buy: new DummyStrategy(),
      sell: new DummyStrategy(),
    });
    const operation = {
      operation: 'unknown',
      'unit-cost': 10,
      quantity: 1,
    } as unknown as Operation;
    expect(() =>
      handler.processOperation(operation, context)
    ).toThrow(UnsupportedOperationTypeError);
  });

  it('should pass the correct context to the strategy', () => {
    const spyStrategy: OperationStrategy = {
      execute: jest.fn().mockReturnValue({ tax: 0 }),
    };
    const handlerWithSpy = new OperationHandler({
      buy: spyStrategy,
      sell: new DummyStrategy(),
    });
    const operation: Operation = {
      operation: 'buy',
      'unit-cost': 5,
      quantity: 2,
    };
    handlerWithSpy.processOperation(operation, context);
    expect(spyStrategy.execute).toHaveBeenCalledWith(operation, context);
  });
});
