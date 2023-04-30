const Product = require('../models/product');


exports.postAddProduct = async(req, res, next) => {
  
  try{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const userId=req.user.id;

    const data=await Product.create({
      title:title,
      price:price,
      imageUrl:imageUrl,
      description:description,
      userId:userId
    });
    res.status(201).json({product:data});   
  }catch(err){
  console.log(err);
  res.status(500);   
  }
 
};

exports.putEditProduct = (req, res, next) => {
  const id = req.params.id;
  const { title, price, imageUrl, description } = req.body;
  
  Product.update({
    title,
    price,
    imageUrl,
    description
  }, {
    where: {
      id: id
    }
  })
  .then(result => {
    res.send('Product updated successfully');
  })
  .catch(err => {
    console.log(err);
    res.send('Error updating product');
  });
   
};



exports.getProducts = async(req, res, next) => {
  // Product.findAll()
  try{
    const products=await req.user.getProducts()
   res.status(200).json({products:products});
  }catch(err){
    console.log(err);
    res.status(500).json({err:err});
  }
   
};

exports.DeleteProduct=async(req,res,next)=>{

  try{
    const prodId=req.params.id;
    const userId=req.user.id;

    await Product.destroy({where:{id:prodId,userId:userId}});
  }catch(err){
    console.log(err);
    res.status(401);
  }
};