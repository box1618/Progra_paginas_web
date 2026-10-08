import { Request, Response } from 'express';
import pool from '../conf/dbConnection';

// 1. Obtener todos los productos activos
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await pool.query('SELECT * FROM products WHERE active = TRUE');
        return res.status(200).json(rows);
    } catch (error) {
        console.error("ERROR DETALLADO EN MYSQL (getAll):", error);
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

// 2. Obtener producto por ID (activo)
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido. Debe ser un entero positivo.' });
        }

        const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ? AND active = TRUE', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o inactivo' });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error("ERROR DETALLADO EN MYSQL (getById):", error);
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

// 3. Crear producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, stock, description, brand, img } = req.body;

        if (!name || typeof price !== 'number' || price <= 0 || typeof stock !== 'number' || !description) {
            return res.status(400).json({ message: 'Datos incompletos o precio/stock inválidos.' });
        }

        const [result]: any = await pool.query(
            'INSERT INTO products (name, price, stock, description, brand, img, active) VALUES (?, ?, ?, ?, ?, ?, TRUE)',
            [name, price, stock, description, brand || null, img || null]
        );

        return res.status(201).json({
            message: 'Producto creado exitosamente',
            productId: result.insertId
        });
    } catch (error) {
        console.error("ERROR DETALLADO EN MYSQL (create):", error);
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

// 4. Actualizar producto completo
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        const { name, price, stock, description, brand, img } = req.body;
        if (!name || typeof price !== 'number' || price <= 0 || typeof stock !== 'number' || !description) {
            return res.status(400).json({ message: 'Datos incompletos o precio/stock inválidos.' });
        }

        const [check]: any = await pool.query('SELECT * FROM products WHERE id = ? AND active = TRUE', [id]);
        if (check.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o inactivo.' });
        }

        await pool.query(
            'UPDATE products SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ? WHERE id = ?',
            [name, price, stock, description, brand || null, img || null, id]
        );

        return res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error("ERROR DETALLADO EN MYSQL (update):", error);
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

// 5. Baja lógica
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        const [check]: any = await pool.query('SELECT * FROM products WHERE id = ? AND active = TRUE', [id]);
        if (check.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o ya está inactivo.' });
        }

        await pool.query('UPDATE products SET active = FALSE WHERE id = ?', [id]);

        return res.status(200).json({ message: 'Producto dado de baja lógicamente' });
    } catch (error) {
        console.error("ERROR DETALLADO EN MYSQL (delete):", error);
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

// 6. Cambiar precio exclusivamente (PATCH)
export const changePrice = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        const { price } = req.body;
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ message: 'El precio debe ser un número mayor a cero.' });
        }

        const [check]: any = await pool.query('SELECT * FROM products WHERE id = ? AND active = TRUE', [id]);
        if (check.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o inactivo.' });
        }

        await pool.query('UPDATE products SET price = ? WHERE id = ?', [price, id]);

        return res.status(200).json({ message: 'Precio actualizado exitosamente' });
    } catch (error) {
        console.error("ERROR DETALLADO EN MYSQL (changePrice):", error);
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
};