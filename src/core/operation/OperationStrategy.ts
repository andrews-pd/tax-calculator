import { Operation, OperationResult } from '../types';
import { OperationContext } from './OperationContext';

/**
 * OperationStrategy defines the interface for processing a financial operation.
 * Each concrete strategy implements its own logic for handling a specific operation type.
 */
export interface OperationStrategy {
  execute(operation: Operation, context: OperationContext): OperationResult;
}
