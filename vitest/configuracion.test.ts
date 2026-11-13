import { describe, it, expect } from 'vitest';

import config from './vitest.config.mts';
 
describe('vitest.config.mts', () => {
  const test = config.test!; // aseguramos que test no sea undefined
 
  it('usa el entorno node con globals', () => {
    expect(test.environment).toBe('node'); // verifica que el entorno sea 'node'
    expect(test.globals).toBe(true); // verifica que globals sea true
  });
 
  it('configuracion', () => {
    expect(test.coverage).toMatchObject({
      clean: false, // verifica que clean sea false
      reporter: ['text', 'html', 'json'], // verifica que reporter sea un array con los valores esperados
      reportsDirectory: './coverage', // verifica que reportsDirectory sea './coverage'
      reportOnFailure: true, // verifica que reportOnFailure sea true
    });
  });
});