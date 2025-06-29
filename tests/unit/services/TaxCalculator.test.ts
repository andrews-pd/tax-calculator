import { TaxCalculator } from '../../../src/services/TaxCalculator';
import { OperationHandler } from '../../../src/core/operation/OperationHandler';
import { BuyOperationStrategy } from '../../../src/core/operation/strategies/BuyOperationStrategy';
import { SellOperationStrategy } from '../../../src/core/operation/strategies/SellOperationStrategy';
import { OperationContext } from '../../../src/core/operation/OperationContext';
import { Operation } from '../../../src/core/types';

describe('TaxCalculator', () => {
  let taxCalculator: TaxCalculator;

  beforeEach(() => {
    const operationHandler = new OperationHandler({
      buy: new BuyOperationStrategy(),
      sell: new SellOperationStrategy(),
    });

    const operationContext = new OperationContext();
    taxCalculator = new TaxCalculator(operationHandler, operationContext);
  });

  it('should return zero tax for only buy operations', () => {
    const operations: Operation[] = [
      { operation: 'buy', 'unit-cost': 10, quantity: 100 },
      { operation: 'buy', 'unit-cost': 20, quantity: 50 },
    ];
    const result = taxCalculator.calculate(operations);
    expect(result).toEqual([{ tax: 0 }, { tax: 0 }]);
  });

  it('should calculate tax for sell operation above exemption', () => {
    const operations: Operation[] = [
      { operation: 'buy', 'unit-cost': 10, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 20, quantity: 5000 },
    ];
    const result = taxCalculator.calculate(operations);
    expect(result).toEqual([{ tax: 0 }, { tax: 10000 }]);
  });

  it('should not tax sell operation below exemption', () => {
    const operations: Operation[] = [
      { operation: 'buy', 'unit-cost': 10, quantity: 100 },
      { operation: 'sell', 'unit-cost': 15, quantity: 10 },
    ];
    const result = taxCalculator.calculate(operations);
    expect(result).toEqual([{ tax: 0 }, { tax: 0 }]);
  });

  it('should handle accumulated loss offsetting profit', () => {
    const operations: Operation[] = [
      { operation: 'buy', 'unit-cost': 10, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 5, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 20, quantity: 3000 }, 
    ];
    const result = taxCalculator.calculate(operations);
    expect(result).toEqual([{ tax: 0 }, { tax: 0 }, { tax: 1000 }]);
  });

  it('should reset context between calculations', () => {
    const operations: Operation[] = [
      { operation: 'buy', 'unit-cost': 10, quantity: 100 },
      { operation: 'sell', 'unit-cost': 15, quantity: 50 },
    ];
    taxCalculator.calculate(operations);
    const result = taxCalculator.calculate([
      { operation: 'buy', 'unit-cost': 20, quantity: 10 },
    ]);
    expect(result).toEqual([{ tax: 0 }]);
  });

  it('should handle empty operations array', () => {
    const result = taxCalculator.calculate([]);
    expect(result).toEqual([]);
  });
});