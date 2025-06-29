import { OperationContext } from './OperationContext';
import { OperationStrategy } from './OperationStrategy';
import { Operation, OperationResult, OperationType } from '../types';
import { UnsupportedOperationTypeError } from '../errors/UnsupportedOperationTypeError';

/**
 * OperationHandler is responsible for delegating the processing of financial operations
 * to the appropriate strategy based on the operation type (buy, sell, etc).
 * It uses the Strategy pattern to allow different processing logic for each operation.
 *
 * @param strategies An object mapping each operation type to its corresponding OperationStrategy implementation.
 */
export class OperationHandler {
  constructor(
    private readonly strategies: Record<OperationType, OperationStrategy>
  ) {}

  processOperation(
    operation: Operation,
    context: OperationContext
  ): OperationResult {
    const strategy = this.strategies[operation.operation];
    if (!strategy) {
      throw new UnsupportedOperationTypeError(operation.operation);
    }
    return strategy.execute(operation, context);
  }
}
