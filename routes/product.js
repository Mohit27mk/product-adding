

const express = require('express');

const adminController = require('../controllers/product');
const userauthentication=require('../middleware/auth')

const router = express.Router();



// /admin/products => GET
router.get('/getproducts',userauthentication.authenticate, adminController.getProducts);

// add products 
router.post('/add-product',userauthentication.authenticate, adminController.postAddProduct);

router.put('/edit-product/:id',userauthentication.authenticate,adminController.putEditProduct);


router.delete('/delete-product/:id',userauthentication.authenticate,adminController.DeleteProduct);

module.exports = router;
