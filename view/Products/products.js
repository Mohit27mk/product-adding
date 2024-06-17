
window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token');
    
  const user =  axios.get(`http://localhost:3000/user/get`,{ headers: {"Authorization":token} })
    axios.get(`http://localhost:3000/user/get`,{ headers: {"Authorization":token} })
    .then((res)=>{
      console.log(res);
      const addProductLink = document.getElementById('addProductLink');
      if (res.data.user_type != 'admin') {
          addProductLink.style.display = 'none';
      }
       }).catch((err)=>{
         console.log(err);
       })

    axios.get(`http://localhost:3000/product/getproducts/`,{ headers: {"Authorization":token} })
    .then((res)=>{
     console.log(res);
      for(var i=0;i<res.data.products.length;i++){
        showProduct(res.data.products[i],user);
      }
    }).catch((err)=>{
      console.log(err);
    })
   })

  function showProduct(product,user){ 
    const productslist = document.querySelector('.products-holder');
    const div = document.createElement('div');
    div.className="card pdd";
    div.style.width="18rem";
    productslist.appendChild(div);
    const img = document.createElement('img');
    img.className="card-img-top";
    img.src=product.imageUrl;
    img.alt=product.title;
    div.appendChild(img);
    const div1 = document.createElement('div');
    div1.className="card-body prodbtn";
    div.appendChild(div1);
     const h5=document.createElement("h5");
     h5.className="card-title";
     h5.appendChild(document.createTextNode(product.title));
     div1.appendChild(h5);
     const h6=document.createElement("h6");
     h6.className="card-subtitle mb-2 text-muted";
     h6.appendChild(document.createTextNode(`Rs. ${product.price}`));
     div1.appendChild(h6);
     const p=document.createElement("p");
     p.className="card-text";
     p.appendChild(document.createTextNode(product.description));
     div1.appendChild(p);
     const deletebtn=document.createElement("a");
     deletebtn.className="btn btn-primary";
     deletebtn.appendChild(document.createTextNode("Delete"));
     const editbtn=document.createElement("a");
     editbtn.className="btn btn-primary";
     editbtn.appendChild(document.createTextNode("Edit"));
     if (user.user_type != 'admin'){
     div1.appendChild(deletebtn);
     div1.appendChild(editbtn);
     }
     const addtocartbtn=document.createElement("a");
     addtocartbtn.className="btn btn-primary";
     addtocartbtn.appendChild(document.createTextNode("AddToCart"));
     div1.appendChild(addtocartbtn);
     deletebtn.onclick=()=>{
        productslist.removeChild(div);
        const token=localStorage.getItem('token');
        axios.delete(`http://localhost:3000/product/delete-product/${product.id}`,{ headers: {"Authorization":token} });
    } 
    editbtn.onclick=()=>{ 
       document.querySelector("#mdl").click();
       
       title.value=product.title;
  imageUrl.value=product.imageUrl;
  price.value=product.price;
  description.value=product.description;

       const save=document.querySelector("#save");
       const form = document.querySelector('.product-form');

       form.addEventListener('submit', event => {
        event.preventDefault();
        
        const title = form.querySelector('#title').value;
        const imageUrl = form.querySelector('#imageUrl').value;
        const price = form.querySelector('#price').value;
        const description = form.querySelector('#description').value;
      
        const prod = {
          title,
          imageUrl,
          price,
          description
        };
      
        console.log(prod);

        h5.innerHTML=title;
        h6.innerHTML=`Rs. ${price}`;
        p.innerHTML=description;
        img.src=imageUrl;
        img.alt=title;
        const token=localStorage.getItem('token');
     axios.put(`http://localhost:3000/product/edit-product/${product.id}`,prod,{ headers: {"Authorization":token} })
     .then((res)=>{
        console.log(res);
    }).catch((err)=>{
     console.log(err);
    })
  
        document.querySelector("#close").click();
            
        
      });   
        
    } 

    addtocartbtn.onclick=()=>{
        const token=localStorage.getItem('token');
        axios.post(`http://localhost:3000/shop/cart/${product.id}`,product,{ headers: {"Authorization":token} });
        window.location.href='../cart/cart.html';      

    }

   }