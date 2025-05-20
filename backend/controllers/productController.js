import mongoose from 'mongoose'; 
import Product from "../model/product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const createProduct = async (req, res) => {
    const products = req.body;

    if (!products.price || !products.name ||
        !products.image) {
        return res.status(400).json({ message: 'please provid all fields' });
    }

    const newProduct = new Product(products);

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data' });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const products = req.body;

    if (!products.price || !products.name ||
        !products.image) {
        return res.status(400).json({ message: 'please provid all fields' });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, products, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteProduct = async (req, res) => {
    // Change this
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

