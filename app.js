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

app.use(cors());

const userRoutes=require('./routes/user');
const adminRoutes = require('./routes/product');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.json({ extended: false }));

app.use(errorController.get404);
app.use('/user',userRoutes)
app.use('/product', adminRoutes);
app.use('/shop',shopRoutes);



Product.belongsTo(User);
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT);
})
.catch(err=>{
    console.log(err);
});


