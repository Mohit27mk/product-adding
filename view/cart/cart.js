const ctItems=document.querySelector(".cartItems");

window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token');

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