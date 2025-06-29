import { roundValue } from '../../../src/helpers/roundValue';

describe('roundValue', () => {
  it('should round to two decimal places', () => {
    expect(roundValue(1.234)).toBe(1.23);
    expect(roundValue(1.235)).toBe(1.24);
    expect(roundValue(1.2)).toBe(1.2);
    expect(roundValue(1)).toBe(1);
    expect(roundValue(0)).toBe(0);
    expect(roundValue(-1.234)).toBe(-1.23);
    expect(roundValue(-1.235)).toBe(-1.24);
  });

  it('should handle large numbers', () => {
    expect(roundValue(123456.78901)).toBe(123456.79);
    expect(roundValue(-987654.32109)).toBe(-987654.32);
  });
});