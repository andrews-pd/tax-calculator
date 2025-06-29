import { spawn } from 'child_process';
import path from 'path';
import { mockInput, mockOutput } from '../mocks/operationMocks';

const runIndexWithInput = (input: string) => {
  return new Promise<string>((resolve, reject) => {
    const indexPath = path.resolve(__dirname, '../../src/index.ts');
    const proc = spawn('ts-node', [indexPath]);

    let output = '';
    proc.stdout.on('data', (data) => {
      output += data.toString();
    });

    proc.stderr.on('data', (data) => {
      reject(data.toString());
    });

    proc.on('close', () => {
      resolve(output.trim());
    });

    proc.stdin.write(input + '\n');
    proc.stdin.end();
  });
};

describe('Integration: Tax Calculator', () => {
  const inputs = mockInput.trim().split('\n');
  const outputs = mockOutput;

  inputs.forEach((input, idx) => {
    it(`should return correct tax calculation for mock case #${idx + 1}`, async () => {
      const output = await runIndexWithInput(input);
      expect(output).toBe(outputs[idx]);
    });
  });

  it('should fail with empty string', async () => {
    await expect(runIndexWithInput('')).rejects.toBeTruthy();
  });
});