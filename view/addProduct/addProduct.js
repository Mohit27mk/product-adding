
const form = document.querySelector('.product-form');

const token= localStorage.getItem('token');



form.addEventListener('submit', event => {
  event.preventDefault();
  
  const title = form.querySelector('#title').value;
  const imageUrl = form.querySelector('#imageUrl').value;
  const price = form.querySelector('#price').value;
  const description = form.querySelector('#description').value;

  const product = {
    title,
    imageUrl,
    price,
    description
  };

  axios.post("http://localhost:3000/product/add-product",product,{ headers: {"Authorization":token} })
  .then((res)=>{
      console.log(res);
  }).catch((err)=>{
   console.log(err);
  })
  

  title.value="";
  imageUrl.value="";
  price.value="";
  description.value=""

  window.location.href='../Products/products.html';      
  
});
