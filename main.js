//TODO Ecommerce



//Func Glob
chooseCategory()


//LocalSotrage
document.addEventListener('DOMContentLoaded',()=>{

    fetchData()

    localStorage.getItem('carrito') ? carrito = JSON.parse(localStorage.getItem('carrito')) : console.log('No se obtuvo el producto!')//Lo parseamos , para no obtener texto plano
       
    pintarCarrito()//Se pinte y se guarde en el carrito


})

//Vars Glob
let carrito = {};
let cantCompra;
let idCategoria = 0;
const inputBuscador = document.getElementById('buscador');








function btnSeleccion(){//Lo nombre como funcion para que asi pueda cargarse los botones a la vez que se pintan los productos , llamando a pintarProcutos y btnComprar() en chooseCategory()


    const infoProd = document.querySelector(".container-prod"); //Seleccionamos el contenedor de los btns
    let botones = infoProd.querySelectorAll('button');//Agarramos todos los botones
    const btnAdd = Array.from(botones);//Lo guardamos en un array
    
    btnAdd.forEach(btn => btn.addEventListener('click', e => {
    
        let padreBtn = e.target.parentElement.parentElement;

        if(Object.keys(carrito).length <= 3 || carrito.hasOwnProperty(e.target.id)){
            Toastify({
                text: "Se agrego un producto!",
                className:"alert-toast",
                duration:1500,
                gravity:"bottom", //top bottom
                position:"left", //left rigth center
                style:{
                    background:"green",
                    padding:"10px 50px",
                    fontSize:"20px",
                    fontFamily:'monospace'
                }
    
            }).showToast();

        }
    
    
        modalBody(padreBtn)
        pintarCarrito()
    
    }));


}

//Filttro de eleccion del cliente
function chooseCategory(){
    const accordion = document.querySelector(".accordion")
    let categorias = accordion.getElementsByTagName('a')
    const btnCategorias = Array.from(categorias);

    btnCategorias.forEach(btn => btn.addEventListener('click', e => {

        idCategoria = e.target.id;
        
        fetchData()
        btnSeleccion()
     
    }));
}

function pintarProductos(productList){
    
    try {
        let productosHTML = '';
        productList[idCategoria].forEach( producto => {
            
            productosHTML +=
            `<div class="producto${producto.id}" id="producto">
                <div class="img-prod"><img src=${producto.src} alt=" "></div>
                <div class="info-prod">
                    <h2>${producto.nombre}</h2>
                    <h3>${producto.precio}</h3>
                    <h4 class="stock">${producto.stock}</h4>
                    <button id="${producto.id}">Agregar Al Carrito</button>
                </div>
            </div>`  

        });

        document.querySelector(".container-prod").innerHTML = productosHTML;
    } 
    catch (error) {
        error = `<h1 class="error"><i class="fa-solid fa-circle-exclamation"></i>Producto no encontrado<i class="fa-solid fa-circle-exclamation"></i></h1>`
        document.querySelector(".container-prod").innerHTML = error;
    }
  

}

function modalBody(infoProd){
    let dataInfo = infoProd.querySelector(".info-prod")
    let dataImg = infoProd.querySelector(".img-prod")
    const condicion = Object.keys(carrito).length <= 3;
    
    let pintarModal = 

        {
            nombre:dataInfo.querySelector("h2").textContent,
            precio:dataInfo.querySelector("h3").textContent,
            img:dataImg.querySelector("img").getAttribute("src"),
            cantidad: 1,
            id:dataInfo.querySelector("button").id,
            stock:parseInt(dataInfo.querySelector("h4").textContent)
        };


    
    switch (condicion) {
        case true:

            //Si el id existe se le suma la cantidad
            if(carrito.hasOwnProperty(pintarModal.id)){
                pintarModal.cantidad =  carrito[pintarModal.id].cantidad + 1;
            } 
            

            //Guardamos info del prod en el carrito
            carrito[pintarModal.id] = {...pintarModal}

            break;
    
        case false:

            if(carrito.hasOwnProperty(pintarModal.id)){
                pintarModal.cantidad =  carrito[pintarModal.id].cantidad + 1;
                carrito[pintarModal.id] = {...pintarModal}
            }else{
                Toastify({
                    text: "Maximo 4 productos en el carrtio!",
                    duration:3000,
                    gravity:"top", 
                    position:"center",
                    style:{
                        background:"red",
                        padding:"20px 60px",
                        fontSize:"25px",
                        fontFamily:'sans-serif',
                        textTransform:"uppercase",
                        fontWeight:"600"
                    }
    
                }).showToast();
            } 
            
            
        
            break;
    }
    

    
    
};

function pintarCarrito(){
    let productosCarrito = ''

    Object.values(carrito).forEach(data => {
        
        productosCarrito += 
            `<div class="productoCar" id="${data.id}">
                <div class="infoCar">
                    <div>
                        <img src="${data.img}" alt=" ">
                    </div>
                    <h3>${data.nombre}</h3>
                    <span>${data.precio}</span>
                    <div class="cont-btnAcc">
                        <button class="agregar" id="${data.id}">+</button>
                        <button class="eliminar" id="${data.id}">-</button>
                    </div>
                    <span>${data.cantidad}</span>
                    <span class="stock">${data.stock}</span>
                </div>
            </div>`
    })
    document.querySelector(".info-carrito").innerHTML = productosCarrito;


    //Cantidad Total Agregada
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad})=> acc + parseInt(cantidad) ,0)//Obtenemos un valor de todas las cant
    cantCompra = nCantidad
    document.getElementById('cantidadDeProd').innerText = cantCompra

   
    
    //LocalStorage
    localStorage.setItem('carrito',JSON.stringify(carrito))//Guardamos los datos

    carritoFooter()


}

function btnAccion(){

    const infoCarrito = document.querySelector(".info-carrito");
    
    infoCarrito.addEventListener("click", e =>{

        let producto = carrito[e.target.id]

        if(e.target.classList.contains("agregar")){

            let sumar = producto.cantidad++ 
            if(sumar){
                cantCompra++;
                document.getElementById('cantidadDeProd').innerText = cantCompra;
                Toastify({
                    text: "Se agrego un producto!",
                    className:"alert-toast",
                    duration:1000,
                    gravity:"bottom", //top bottom
                    position:"left", //left rigth center
                    style:{
                        background:"green",
                        padding:"10px 50px",
                        fontSize:"20px",
                        fontFamily:'monospace'
                    }

                }).showToast();
            }

            carrito[e.target.id] = {...producto}

            pintarCarrito()

            
        }

        else if(e.target.classList.contains("eliminar")){

            let restar = producto.cantidad--
            if(restar){
                cantCompra--;
                document.getElementById('cantidadDeProd').innerText = cantCompra;
                Toastify({
                    text: 'Se elimino un producto!',
                    duration:1000,
                    className:"alert-toast",
                    gravity:"bottom", //top bottom
                    position:"left", //left rigth center
                    style:{
                        background:"red",
                        padding:"10px 50px",
                        fontSize:"20px",
                        fontFamily:'monospace'
                    }

                }).showToast();
            }

            carrito[e.target.id] = {...producto}


            if(producto.cantidad == 0){
                delete carrito[e.target.id]
                document.querySelector(".total").innerHTML = '<h5>El carrito esta vacio!</h5>';
            }

            pintarCarrito()
        }

    })

   

}

btnAccion()


function carritoFooter(){

    if(Object.keys(carrito).length === 0){

        return
    }
    
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad , precio})=> parseInt(acc) + parseInt(precio) * cantidad,0)
    const total = document.querySelector(".total");
   

    total.innerHTML = `
    <button class="comprar">Comprar</button>
    <div class="container-total">
        <p>TOTAL: $${nPrecio}</p> 
        <button class="vaciar">Vaciar Carrito</button>
    </div>
    `

    const btnVaciar = document.querySelector(".vaciar");
    btnVaciar.addEventListener("click",()=>{
        

        Swal.fire({
                title: 'Estas seguro de vaciar el carrito?',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No`,
            })
            .then((result) => {

                if (result.isConfirmed) {

                    Swal.fire('Carrito vacio!', '', 'success')
                    carrito = {}
                    document.querySelector(".total").innerHTML = '<h5>El carrito esta vacio!</h5>';

                    pintarCarrito()
                } 
                else if (result.isDenied) {
                    Swal.fire('Cambios cancelados!', '', 'error')
                }
            })

          
    })

    const btnComprar = document.querySelector(".comprar")
    btnComprar.addEventListener("click",(e)=>{

        compra()
      
    })


}

function compra(){


    setTimeout(()=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La compra se realizó correctamente!',
            showConfirmButton: false,
            timer: 2500 
        })
    },1500)

    carrito = {};
    document.querySelector(".total").innerHTML = '<h5>El carrito esta vacio!</h5>';
                    
            
             
        
    pintarCarrito()  
}

function datosBusqueda(productList){

    inputBuscador.addEventListener("keyup" , e =>{

        try {
            let texto = e.target.value
            let er = new RegExp(texto , "i")
    
            for (let i = 0; i < productList[idCategoria].length; i++) {

                if(er.test(productList[idCategoria][i].nombre)){
                    document.querySelector(".container-prod").childNodes[i].classList.remove("ocultar")  
                }else{
                    document.querySelector(".container-prod").childNodes[i].classList.add("ocultar")
                } 
            }

        } catch (err) {
            err = 'No es posbile buscar aquí!'
            
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err,
                showConfirmButton: false,
                timer: 1500 
            })
        }

        

    
    })
}

const fetchData = async () =>{

    const response = await fetch("./data.json");
    const productList = await response.json()
    pintarProductos(productList)
    btnSeleccion()
    datosBusqueda(productList)
      
}
