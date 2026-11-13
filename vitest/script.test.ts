import { describe, it, expect } from 'vitest'; // describe es una funcion de Vitest que agrupa pruebas relacionadas
 
import { readFileSync } from 'node:fs';
 
const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
 
describe('scripts de package.json', () => { // describe es una funcion de Vitest que agrupa pruebas relacionadas
  it('test ejecuta Vitest una vez', () => { // it es una funcion de Vitest que define una prueba individual
    expect(pkg.scripts.test).toBe('vitest run'); // expect es una funcion de Vitest que hace una afirmacion sobre el valor esperado
  });
 
  it('test:watch ejecuta Vitest en modo observación', () => { // it es una funcion de Vitest que define una prueba individual
    expect(pkg.scripts['test:watch']).toBe('vitest'); // expect es una funcion de Vitest que hace una afirmacion sobre el valor esperado
  });
 
  it('test:coverage ejecuta una vez con cobertura', () => { // it es una funcion de Vitest que define una prueba individual
    expect(pkg.scripts['test:coverage'].trim()).toBe('vitest run --coverage'); // expect es una funcion de Vitest que hace una afirmacion sobre el valor esperado
  });
});