const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require('./util/database');

const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');

const app = express();

require('dotenv').config();

var cors=require('cors');

app.use(cors());//for accepting the req from frontend which is running on another port


const userRoutes=require('./routes/user');
const adminRoutes = require('./routes/product');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.json({ extended: false }));

//routes
app.use('/user',userRoutes)
app.use('/product', adminRoutes);
app.use('/shop',shopRoutes);
app.use(errorController.get404);


Product.belongsTo(User);
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:CartItem});//one cart can have may products
Product.belongsToMany(Cart,{through:CartItem});//one product can belong to many cart

//if we have database then start server
sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT);
})
.catch(err=>{
    console.log(err);
});


