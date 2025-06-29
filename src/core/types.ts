export type OperationType = 'buy' | 'sell';

export type Operation = {
  operation: OperationType;
  "unit-cost": number;
  quantity: number;
}

export type OperationResult = {
  tax: number;
}
