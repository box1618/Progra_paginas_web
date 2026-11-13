import { describe, it, expect } from 'vitest';
 
import { readFileSync } from 'node:fs';
 
const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
 
describe('scripts de package.json', () => {
  it('test ejecuta Vitest una vez', () => {
    expect(pkg.scripts.test).toBe('vitest run');
  });
 
  it('test:watch ejecuta Vitest en modo observación', () => {
    expect(pkg.scripts['test:watch']).toBe('vitest');
  });
 
  it('test:coverage ejecuta una vez con cobertura', () => {
    expect(pkg.scripts['test:coverage'].trim()).toBe('vitest run --coverage');
  });
});