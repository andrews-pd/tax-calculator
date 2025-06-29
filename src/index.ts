import { createInterface } from 'readline';
import { OperationHandler } from './core/operation/OperationHandler';
import { BuyOperationStrategy } from './core/operation/strategies/BuyOperationStrategy';
import { SellOperationStrategy } from './core/operation/strategies/SellOperationStrategy';
import { TaxCalculator } from './services/TaxCalculator';
import { OperationContext } from './core/operation/OperationContext';
import { Operation } from './core/types';

const rl = createInterface({
  input: process.stdin,
});

const operationHandler = new OperationHandler({
  buy: new BuyOperationStrategy(),
  sell: new SellOperationStrategy(),
});
const operationContext = new OperationContext();
const taxCalculator = new TaxCalculator(operationHandler, operationContext);

rl.on('line', (line) => {
  try {
    const operations = JSON.parse(line) as Operation[];
    const taxes = taxCalculator.calculate(operations);
    console.log(JSON.stringify(taxes));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }

    console.error('An unexpected error occurred.');
    process.exit(1);
  }
});
