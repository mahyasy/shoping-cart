const container = document.querySelector('.container');
const cartCount = document.querySelector('.cartCount');

function setTimer(){
     const date = new Date();
     document.getElementById('time').innerHTML= date.toLocaleTimeString()
}

setInterval(setTimer,1000)

const product = [
     {id:0 , title:"tshirt", price:30, photolink:'tshirt.jpg'},
     {id:1 , title:"sneakers", price:240, photolink:'shoes.jpg'}
]


function renderProduct(){
     container.innerHTML = 'Loading...';
   return new Promise((res,rej)=>{
     setTimeout(()=>{
          container.innerHTML = '';
          res(product);

     },2000)

   })
}
const createProduct=(p)=>{
     const newPro =  document.createElement('div');
      newPro.classList = 'product';
      newPro.innerHTML = `
      <div class='imgContainer'>
      <img src=${p.photolink} alt=${p.title}>
      </div>
      <div class='productDetail'>
      <h2>${p.title}</h2>
      <p>${p.price}</p>
      </div>
      <button class='productAddBtn' onclick='cartPrevent(event)'>Add to cart</button>
      
      
      `
      container.appendChild(newPro)



}

function addBtn(btn){
     btn.innerHTML = 'Processing...';
     btn.setAttribute('disabled','');
     return new Promise((res,rej)=>{{
          setTimeout(()=>{
               res('resolve add btn');
               addEvent(btn);

          },2000)
     }})

}



function addEvent(e){
     if(e.classList[0] ==  "productAddBtn"){
          e.innerHTML = 'in cart';
          cartCount.innerHTML = parseInt(cartCount.innerHTML)+1;
     }
}
 async function cartPrevent(event){
const btn = event.target;
console.log(btn.innerHTML);
if(btn.innerHTML == 'Add to cart'){
     const mine = await addBtn(btn);
     btn.removeAttribute('disabled');
     console.log(mine)
}else if(btn.innerHTML == 'in cart'){
     alert('already in cart')

}
}
  async function asyncCall(){
     const pro = await renderProduct(product);
     product.forEach((P)=>{
          createProduct(P)
     })
}
asyncCall()