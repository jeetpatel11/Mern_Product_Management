import express from 'express';
import mongoose from 'mongoose';
import Product from '../model/product.js';

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/productcontroller.js';


const router = express.Router();


router.post('/', createProduct);
router.get('/',getProducts)
router.put('/:id', updateProduct); 
router.delete('/:id',deleteProduct);



export default router;