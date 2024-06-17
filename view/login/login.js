const loginForm=document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

loginForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  const email=e.target.email.value;
  const password=e.target.password.value;

    const myobj={
      email,password
    }
    
    axios.post("http://localhost:3000/user/login",myobj)
    .then((res)=>{
      if(res.data.login==='Login succesful'){
        alert(`Hello ${res.data.email}!`);
        localStorage.setItem('token',res.data.token);
        window.location.href='../Products/products.html';
      }else
      alert("wrong credentials");
    }).catch((err)=>{
     console.log(err);
     alert("something went wrong");
    })
   emailInput.value='';
   passwordInput.value='';
    
   
}
