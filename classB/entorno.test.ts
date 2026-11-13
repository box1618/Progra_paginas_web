import { describe, it, expect } from 'vitest';
 
describe('entorno de pruebas', () => {
  it('los globals de Vitest están habilitados', () => {
    const g = globalThis as Record<string, unknown>;
    expect(typeof g.describe).toBe('function');
    expect(typeof g.it).toBe('function');
    expect(typeof g.expect).toBe('function');
  });
 
  it('se ejecuta en Node.js', () => {
    expect(typeof process.versions.node).toBe('string');
  });
 
  it('carga las variables de entorno de ejemplo', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.DB_NAME).toBe('universitienda_test');
  });
 
  it('define todas las variables de .env.example', () => {
    const requeridas = ['PORT', 'DB_USER', 'DB_PORT', 'DB_HOST', 'DB_PASSWORD', 'DB_NAME'];
    for (const nombre of requeridas) {
      expect(process.env[nombre], `falta ${nombre}`).toBeTruthy();
    }
  });
});