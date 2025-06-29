import { OperationHandler } from '../core/operation/OperationHandler';
import { OperationContext } from '../core/operation/OperationContext';
import { Operation, OperationResult } from '../core/types';

/**
 * TaxCalculator is responsible for processing a list of financial operations,
 * updating the stocks context, and calculating the tax for each operation.
 * It uses the OperationHandler to process each operation individually,
 * maintaining the state of stocks, average price, and accumulated loss throughout the operations.
 * After each operation, the context is updated and the tax amount is returned.
 *
 * @param operationHandler The OperationHandler instance used to process each operation.
 * @param operationContext The OperationContext instance that maintains the state of stocks, average price, and accumulated loss.
 */
export class TaxCalculator {
  constructor(
    private readonly operationHandler: OperationHandler,
    private readonly operationContext: OperationContext
  ) {}

  calculate(operations: Operation[]): OperationResult[] {
    this.operationContext.reset();

    return operations.map((operation) => {
      return this.operationHandler.processOperation(operation, this.operationContext);
    });
  }
}
