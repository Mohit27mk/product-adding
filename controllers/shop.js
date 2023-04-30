const Product = require('../models/product');
const Cart=require('../models/cart');

//getting products from data base which is in the cart
exports.getCart = (req, res, next) => {
try{
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts()
    .then(products=>{
         res.status(201).json({cartItems:products})
    })
    .catch(err=>{throw new Error});
  })
  .catch(err=>{throw new Error});
}catch(err){
console.log(err);
res.status(500).json({err:err});
}
};

//adding products in the cart 
exports.postCart=(req,res,next)=>{
 try{
  const prodId=req.params.id;
  let fetchCart;
  let newQuantity=1;
  req.user.getCart()
  .then(cart=>{
   fetchCart=cart;
   return cart.getProducts({where:{id:prodId}},);
  }).then(products=>{
   let product;
   if(products.length>0){
     product=products[0];
   }
   
   if(product){
    const oldQuantity=product.cartItem.quantity;
    newQuantity=oldQuantity+1;
    return product;
   }
 
   return Product.findByPk(prodId)
  }).then(product=>{
   return fetchCart.addProduct(product,{
     through:{quantity:newQuantity}
    })
  })
  .then((result)=>{
   res.status(200).json({data:result});
  })
  .catch(err=>{throw new Error});
 }catch(err){
 console.log(err);
 res.status(500).json({err:err});
 }
};

//delete products from cart in database
exports.postCartDeleteProduct=(req,res,next)=>{
  try{
    const prodId=req.params.id;
 req.user.getCart()
 .then(cart=>{
  return cart.getProducts({where:{id:prodId}});
 }).then(products=>{
  const product=products[0];
  return product.cartItem.destroy();
 }).then(result=>{
    res.status(201);
 }).catch(err=>{throw new Error});
  }catch(err){
    console.log(err);
    res.status(401).json({err:err});
  }
 
}
