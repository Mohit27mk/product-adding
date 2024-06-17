const Product = require('../models/product');
const Cart=require('../models/cart');
const sendCheckoutEmail = require('../util/mailer');

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


exports.clearCart = async (req, res, next) => {
  try {
      const cart = await req.user.getCart();
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      await cart.setProducts(null); // This will clear all products in the cart
        const subject = 'Order Confirmation';
        const text = `Thank you for your order! It will be shipped to address soon.`;
        await sendCheckoutEmail(req.user.email, subject, text);  

      res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to clear cart" });
  }
};
