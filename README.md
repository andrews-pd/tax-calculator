# Tax Operations Calulator

Project for calculating taxes on stock trading operations, following exemption and loss compensation rules.

## Technical and Architectural Decisions

- **TypeScript**: Chosen to ensure static typing, greater safety, and code readability.
- **Strategy Pattern**: Used to separate the logic for each operation type (`buy` and `sell`), making maintenance and extensibility easier.
- **Operation Handler**: [`OperationHandler`](src/core/operation/OperationHandler.ts) delegates processing to the appropriate strategy, centralizing the flow.
- **Tax Calculation**: [`TaxCalculator`](src/services/TaxCalculator.ts) maintains the context of stocks, average price, and accumulated loss, processing operations in sequence.
- **Helpers**: Utility functions like [`roundValue`](src/helpers/roundValue.ts) ensure calculation accuracy.

### SOLID Principles Applied

- **Single Responsibility Principle (SRP)**: Each class has a single responsibility. For example, `TaxCalculator` only handles tax calculation, while `OperationHandler` only delegates operations.
- **Open/Closed Principle (OCP)**: The system is open for extension but closed for modification. New operation types can be added by creating new strategies without changing existing code.
- **Liskov Substitution Principle (LSP)**: All operation strategies implement the same interface and can be substituted without affecting the handler's behavior.
- **Interface Segregation Principle (ISP)**: Interfaces are small and specific, such as `OperationStrategy`, so implementations are not forced to depend on unused methods.
- **Dependency Inversion Principle (DIP)**: Core dependencies (like operation strategies) are injected, making it easy to swap or test components.

## Justification for Library Usage

- **ts-node**: Allows running TypeScript files directly, speeding up development.
- **Jest**: Chosen test framework for its integration with TypeScript and ease of use.
- **ESLint and Prettier**: Keep code style consistent and help avoid common mistakes.

## Project Structure

```sh
/src
 ├── core
 │    ├── errors
 │    │     ├── AppError.ts
 │    │     └── UnsupportedOperationTypeError.ts
 │    └── operation
 │         ├── OperationContext.ts
 │         ├── OperationHandler.ts
 │         ├── OperationStrategy.ts
 │         ├── strategies
 │         │     ├── BuyOperationStrategy.ts
 │         │     └── SellOperationStrategy.ts
 │         └── types.ts
 ├── helpers
 │    └── roundValue.ts
 ├── services
 │    └── TaxCalculator.ts
 └── index.ts
/tests
 ├── unit
 └── integration
```

## Input and Output Example

### Example input:

```json
{"operation":"buy","unit-cost":10.00,"quantity":100}
{"operation":"buy","unit-cost":15.00,"quantity":50}
{"operation":"sell","unit-cost":20.00,"quantity":80}
{"operation":"sell","unit-cost":5.00,"quantity":50}
```

### Expected output:

```json
[{"tax":0.00},{"tax":0.00},{"tax":100.00},{"tax":0.00}]
```

Each input line represents an operation. The output is a JSON array, where each object indicates the tax due after each operation.

---

## Requirements

node >= 20

## How to Run the Project

1. Install dependencies:

```sh
npm install
```

2. Run the project:

```sh
npm ci
```

3. Run the project reading from a file:

```sh
npm start < file-name.txt
```

## How to Test

1. To run unit tests:
```sh
npm test:unit
```

2. To run integration tests:
```sh
npm test:unit
```

3. To generate unit test coverage:
```sh
npm test:coverage
```