const ctItems=document.querySelector(".cartItems");

window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token'); 

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
       const checkout = document.getElementById('checkout');
           
       checkout.onclick=()=>{
        ctItems.innerHTML = ''
        const token=localStorage.getItem('token');
        axios.delete(`http://localhost:3000/shop/clear-cart`,{ headers: {"Authorization":token} });  
    }
       

    axios.get(`http://localhost:3000/shop/cart/`,{ headers: {"Authorization":token} })
    .then((res)=>{
        console.log(res);
         for(var i=0;i<res.data.cartItems.length;i++){
           showCart(res.data.cartItems[i]);
         }
       }).catch((err)=>{
         console.log(err);
       })
      });

     function showCart(cartItems){
       const li=document.createElement("li");
       ctItems.appendChild(li);
       li.className="items";
       li.appendChild(document.createTextNode(`${cartItems.title} (${cartItems.cartItem.quantity})`));
        const deletebtn=document.createElement("button");
        deletebtn.className="btn";
        deletebtn.appendChild(document.createTextNode("Delete"));
        li.appendChild(deletebtn);

        deletebtn.onclick=()=>{
            ctItems.removeChild(li);
            const token=localStorage.getItem('token');
            axios.delete(`http://localhost:3000/shop/delete-cart-item/${cartItems.cartItem.productId}`,{ headers: {"Authorization":token} });  
        }
      }