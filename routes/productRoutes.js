import express from 'express';
import { createProducts, deleteProducts, getProduct, getProducts, updateProducts } from '../controllers/productController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { checkfile, updateCheckfile } from '../middlewares/checkfile.js';
import { checkId } from '../middlewares/checkId.js';
import { checkAdmin, checkUser } from '../middlewares/checkUser.js';

const router= express.Router();

router.route('/api/products')
.get(getProducts)
.post(checkUser, checkAdmin, checkfile, createProducts).all(notAllowed )


router.route('/api/products/:id')
.get(checkId, getProduct)
.patch(checkId, updateCheckfile, updateProducts) 
.delete(checkId, deleteProducts).all(notAllowed)

export default router; 