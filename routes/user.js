const express = require('express');
const userauthentication=require('../middleware/auth')

const userController = require('../controllers/user');

const router = express.Router();


router.post('/signup',userController.postAddUser);

router.post('/login',userController.postLoginUser);
router.get('/get',userauthentication.authenticate,userController.getUserDetails);





module.exports = router;