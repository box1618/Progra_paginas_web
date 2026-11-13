import { describe, it, expect } from 'vitest';
 
describe('entorno de pruebas', () => {
  it('los globals de Vitest están habilitados', () => {
    const g = globalThis as Record<string, unknown>; // aseguramos que g sea un objeto con claves de tipo string y valores de tipo unknown
    expect(typeof g.describe).toBe('function'); // verifica que describe sea una función
    expect(typeof g.it).toBe('function'); // verifica que it sea funcion
    expect(typeof g.expect).toBe('function'); // verifica que expect sea funcion
  });
 
  it('se ejecuta en Node.js', () => {
    expect(typeof process.versions.node).toBe('string'); // verifica que process.versions.node sea un string
  });
 
  it('carga las variables de entorno de ejemplo', () => {
    expect(process.env.NODE_ENV).toBe('test'); // verifica que NODE_ENV sea 'test'
    expect(process.env.DB_NAME).toBe('universitienda_test'); // verifica que DB_NAME sea 'universitienda_test'
  });
 
  it('define todas las variables de .env.example', () => {
    const requeridas = ['PORT', 'DB_USER', 'DB_PORT', 'DB_HOST', 'DB_PASSWORD', 'DB_NAME']; // lista de variables requeridas
    for (const nombre of requeridas) { //for de cada variable requerida
      expect(process.env[nombre], `falta ${nombre}`).toBeTruthy(); // verifica que cada variable requerida 
    }
  });
});