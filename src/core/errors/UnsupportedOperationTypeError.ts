import { AppError } from './AppError';

export class UnsupportedOperationTypeError extends AppError {
  constructor(operationType: string) {
    super(`Unsupported operation type: ${operationType}`);
    this.name = 'UnsupportedOperationTypeError';
  }
}
