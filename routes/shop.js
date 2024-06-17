const userauthentication=require('../middleware/auth')

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//for getting product which is present in cart from database
router.get('/cart',userauthentication.authenticate, shopController.getCart);

//for adding product in the cart
router.post('/cart/:id',userauthentication.authenticate,shopController.postCart);

//for delete product from cart in database
router.delete('/delete-cart-item/:id',userauthentication.authenticate,shopController.postCartDeleteProduct);

router.delete('/clear-cart',userauthentication.authenticate,shopController.clearCart);



module.exports = router;
