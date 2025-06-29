import { OperationContext } from '../../../../src/core/operation/OperationContext';

describe('OperationContext', () => {
  it('should initialize with zeros', () => {
    const ctx = new OperationContext();
    
    expect(ctx.totalStocks).toBe(0);
    expect(ctx.averageStockPrice).toBe(0);
    expect(ctx.accumulatedLoss).toBe(0);
  });

  it('should update all properties correctly', () => {
    const ctx = new OperationContext();
    ctx.update(100, 50.5, 20);

    expect(ctx.totalStocks).toBe(100);
    expect(ctx.averageStockPrice).toBe(50.5);
    expect(ctx.accumulatedLoss).toBe(20);
  });

  it('should update with negative and zero values', () => {
    const ctx = new OperationContext();
    ctx.update(0, -10, -5);

    expect(ctx.totalStocks).toBe(0);
    expect(ctx.averageStockPrice).toBe(-10);
    expect(ctx.accumulatedLoss).toBe(-5);
  });

  it('should reset all properties to zero', () => {
    const ctx = new OperationContext();
    ctx.update(10, 100, 5);
    ctx.reset();

    expect(ctx.totalStocks).toBe(0);
    expect(ctx.averageStockPrice).toBe(0);
    expect(ctx.accumulatedLoss).toBe(0);
  });
});