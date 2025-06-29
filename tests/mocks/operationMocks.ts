export const mockInput = `
[{"operation":"buy", "unit-cost":10.00, "quantity": 100},{"operation":"sell", "unit-cost":15.00, "quantity": 50},{"operation":"sell", "unit-cost":15.00, "quantity": 50}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 3000}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000},{"operation":"sell", "unit-cost":25.00, "quantity": 5000}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":15.00, "quantity": 5000},{"operation":"sell", "unit-cost":30.00, "quantity": 4350},{"operation":"sell", "unit-cost":30.00, "quantity": 650}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":50.00, "quantity": 10000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":50.00, "quantity": 10000}]
[{"operation":"buy", "unit-cost": 5000.00, "quantity": 10},{"operation":"sell", "unit-cost": 4000.00, "quantity": 5},{"operation":"buy",  "unit-cost": 15000.00, "quantity": 5},{"operation":"buy",  "unit-cost": 4000.00, "quantity": 2},{"operation":"buy",  "unit-cost": 23000.00, "quantity": 2},{"operation":"sell", "unit-cost": 20000.00, "quantity": 1},{"operation":"sell", "unit-cost": 12000.00, "quantity": 10},{"operation":"sell", "unit-cost": 15000.00, "quantity": 3}]
`

export const mockOutput = [
`[{"tax":0},{"tax":0},{"tax":0}]`,
`[{"tax":0},{"tax":10000},{"tax":0}]`,
`[{"tax":0},{"tax":0},{"tax":1000}]`,
`[{"tax":0},{"tax":0},{"tax":0}]`,
`[{"tax":0},{"tax":0},{"tax":0},{"tax":10000}]`,
`[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000}]`,
`[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000},{"tax":0},{"tax":0},{"tax":3700},{"tax":0}]`,
`[{"tax":0},{"tax":80000},{"tax":0},{"tax":60000}]`,
`[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":1000},{"tax":2400}]`
]