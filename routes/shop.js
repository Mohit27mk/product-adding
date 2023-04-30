const userauthentication=require('../middleware/auth')

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/cart',userauthentication.authenticate, shopController.getCart);

router.post('/cart/:id',userauthentication.authenticate,shopController.postCart);

router.delete('/delete-cart-item/:id',userauthentication.authenticate,shopController.postCartDeleteProduct);



module.exports = router;
