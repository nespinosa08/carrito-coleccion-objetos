
const fichas = document.querySelector('.fichas');
const templateCard = document.getElementById('template-card').content;
//console.log(templateCard);

const carritoBody = document.querySelector('.carrito-body');
const templateCarrito = document.getElementById('template-carrito').content;

const carritoFooter = document.querySelector('.carrito-footer')
const templateFooter = document.getElementById('template-footer').content;

carritoBody.addEventListener('click', (e)=>{
    //console.log(e.target);

    
    if (e.target.classList.contains('btn-danger')){
       // console.log(carrito[e.target.getAttribute('data-id')].producto.cant);
        if (carrito[e.target.getAttribute('data-id')].producto.cant>0){

            carrito[e.target.getAttribute('data-id')].producto.cant--;
        }
        if (carrito[e.target.getAttribute('data-id')].producto.cant===0){
            delete carrito[e.target.getAttribute('data-id')];
        }
        
    }
    if (e.target.classList.contains('btn-info')){
        carrito[e.target.getAttribute('data-id')].producto.cant++;
    }
    
    //console.log(carrito[e.target.getAttribute('data-id')].producto.cant)
    //console.log(carrito);

    pintarCarritoBody(carrito);
    e.stopPropagation();

})

const fragment = document.createDocumentFragment();

//const producto = {};
let cont=0;
let carrito={};

document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();
    
})

fichas.addEventListener('click', (e)=>{
    //console.log(e.target);
    addToCar(e);

    
})


//const apiUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';
//const apiUrl = 'https://api.chucknorris.io/jokes/random';
const apiUrl = 'https://jsonplaceholder.typicode.com/users';


const fetchData = async () =>{
    try{
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        //console.log(data[0]);
        pintarElement(data);      
       
    }catch (error){
        console.log(error);
    }
}

const pintarElement = (data)=>{
    //console.log(data);
    
    for (let i in data){
        //console.log(data[i]);
        templateCard.querySelector('.name').textContent = data[i].name;
        templateCard.querySelector('.address').textContent = data[i].address.street;
        templateCard.querySelector('.company').textContent = data[i].company.name;
        templateCard.querySelector('.email').textContent = data[i].email;
        templateCard.querySelector('.phone').textContent = data[i].phone;
        templateCard.querySelector('.username').textContent = data[i].username;
        templateCard.querySelector('.website').textContent = data[i].website;
        templateCard.querySelector('.salary').textContent = data[i].id*10;
        templateCard.querySelector('.btn').setAttribute('data-id',data[i].id);
        const clone = templateCard.cloneNode(true);
        fragment.append(clone);
    }
    fichas.append(fragment);
}

const addToCar = (e) =>{

if (e.target.classList.contains('btn')){
    cont++;
    
    const objeto = e.target.parentElement;
    //console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn').getAttribute('data-id'),
        name: objeto.querySelector('.name').textContent,
        salary: objeto.querySelector('.salary').textContent,
        cant: 1
    }
    if (!carrito[producto.id]){
        
        carrito[producto.id]={producto};
    } else{
        //console.log('ya existe');
        carrito[producto.id].producto.cant++
        //console.log(carrito[producto.id].producto.cant);
    }
    
  

   //console.log(carrito);

}
e.stopPropagation();
pintarCarritoBody(carrito);
}




const pintarCarritoBody = (carrito)=>{
    //console.log(carrito);
    carritoBody.innerHTML = ''; //para limpiar el HTML y no se repitan los elementos al dar click
    Object.values(carrito).forEach(elem =>{
        templateCarrito.querySelector('.id').textContent = elem.producto.id;
        templateCarrito.querySelector('.name').textContent = elem.producto.name;
        templateCarrito.querySelector('.cant').textContent = elem.producto.cant;
        templateCarrito.querySelector('.salary').textContent = elem.producto.salary;
        templateCarrito.querySelector('span').textContent = elem.producto.cant * elem.producto.salary;
        templateCarrito.querySelector('.btn-danger').setAttribute('data-id', elem.producto.id);
        templateCarrito.querySelector('.btn-info').setAttribute('data-id', elem.producto.id);

        const clone = templateCarrito.cloneNode(true);
        fragment.append(clone);

    })
/*     for (let i in carrito){
        
        templateCarrito.querySelector('.id').textContent = carrito[i].producto.id;
        templateCarrito.querySelector('.name').textContent = carrito[i].producto.name;
        templateCarrito.querySelector('.cant').textContent = carrito[i].producto.cant;
        templateCarrito.querySelector('.salary').textContent = carrito[i].producto.salary;
        templateCarrito.querySelector('span').textContent = carrito[i].producto.cant * carrito[i].producto.salary;
       
        const clone = templateCarrito.cloneNode(true);
        fragment.append(clone);
    } */
    carritoBody.append(fragment);
    pintarFooter();
    
}
//pintarCarritoBody();

const pintarFooter = ()=>{
    carritoFooter.innerHTML = '';
   // console.log(Object.keys(carrito).length);
    if (Object.keys(carrito).length === 0){
        carritoFooter.innerHTML = `
        <th scope="row" colspan="5">Carrito vacio - Comience a comprar!!</th>
        `
        return;
    } else {

        let conta=0;
        let total =0;
        for (let i in carrito){
        conta = conta + carrito[i].producto.cant;
        total = total + carrito[i].producto.salary * carrito[i].producto.cant;
        }
        templateFooter.querySelector('.num').textContent = conta;
        templateFooter.querySelector('span').textContent = total;
        const clone = templateFooter.cloneNode(true);
        fragment.append(clone);
        carritoFooter.append(fragment);   
        
        const btnVaciar = document.getElementById('vaciar-carrito');
        btnVaciar.addEventListener('click', ()=>{
            carrito = {};
            pintarFooter();
            pintarCarritoBody();
    })
}
        
        
        //console.log(conta);
        //console.log(total);
        
        /* const cantProd = Object.values(carrito[i]).reduce((acc, {cant})=>{
            return acc = acc + cant
        }, 0);
        console.log(cantProd); */
    //console.log(carrito[2].producto.cant);

/*     const kjhadg = Object.values(carrito).forEach((a)=>{
console.log(a.producto.cant);
    }) */
    

}

pintarFooter();