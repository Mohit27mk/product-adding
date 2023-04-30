const Product = require('../models/product');
const Cart=require('../models/cart');


exports.getCart = (req, res, next) => {
req.user.getCart()
.then(cart=>{
  return cart.getProducts()
  .then(products=>{
       res.status(201).json({cartItems:products})
  })
  .catch(err=>console.log(err));
})
.catch(err=>console.log(err));
};

exports.postCart=(req,res,next)=>{
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
 .catch(err=>console.log(err));

};

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.params.id;
 req.user.getCart()
 .then(cart=>{
  return cart.getProducts({where:{id:prodId}});
 }).then(products=>{
  const product=products[0];
  return product.cartItem.destroy();
 }).then(result=>{
    res.status(201);
 }).catch(err=>console.log(err));
 
}
