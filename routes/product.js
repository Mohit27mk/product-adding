

const express = require('express');

const adminController = require('../controllers/product');
const userauthentication=require('../middleware/auth')

const router = express.Router();


//for getting products from database
router.get('/getproducts', adminController.getProducts);

//for adding products in database
router.post('/add-product',userauthentication.authenticate, adminController.postAddProduct);

//for update product in database
router.put('/edit-product/:id',userauthentication.authenticate,adminController.putEditProduct);

//for delete product in database
router.delete('/delete-product/:id',userauthentication.authenticate,adminController.DeleteProduct);

module.exports = router;
