import { describe, it, expect } from 'vitest';

import config from './vitest.config.mts';
 
describe('vitest.config.mts', () => {
  const test = config.test!;
 
  it('usa el entorno node con globals', () => {
    expect(test.environment).toBe('node');
    expect(test.globals).toBe(true);
  });
 
  it('configura la cobertura como indica VITEST.md', () => {
    expect(test.coverage).toMatchObject({
      clean: false,
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
    });
  });
});