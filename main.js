// PEDIR DATOS DEL JSON
const items = document.getElementById("items");
const modal = document.querySelector(".modal-body");
const templateCard = document.getElementById("template-card").content;

const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () =>{
    fetchData();
})
items.addEventListener("click", e =>{
    addCarrito(e);
})

const fetchData = async () => {
    try{
        const res = await fetch("api.json");
        const data = await res.json();
        pintarCards(data);
        
    }
    catch (error){
        console.log(error);
    }
}

const pintarCards = data =>{
    data.forEach(producto => {
       
        templateCard.querySelector("h5").textContent = producto.nombre;
        templateCard.querySelector("p").textContent = producto.info;
        templateCard.querySelector("span").textContent = producto.precio;
        templateCard.querySelector("img").setAttribute("src" , producto.img);
        templateCard.querySelector(".card").setAttribute("id" , producto.idmarca);
        templateCard.querySelector(".btn-primary").dataset.id = producto.id;
        templateCard.querySelector(".btn-primary").setAttribute("data-bs-toggle", "modal");
        templateCard.querySelector(".btn-primary").setAttribute("data-bs-target", "#staticBackdrop");

        
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    
    items.appendChild(fragment);
}

const addCarrito = e =>{
    if (e.target.classList.contains("btn-primary")){
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto =>{
    
    const producto = {
        id: objeto.querySelector(".btn-primary").dataset.id,
        nombre: objeto.querySelector("h5").textContent,
        info: objeto.querySelector("p").textContent,
        precio: objeto.querySelector("span").textContent,
        img: objeto.querySelector("img").src
       
    }
   
    modal.querySelector("h4").textContent = producto.nombre;
    modal.querySelector("h5").textContent = producto.info;
    modal.querySelector("p").textContent = producto.precio;
    modal.querySelector("img").setAttribute("src", producto.img);
    
}

// SCROLL REVEAL

ScrollReveal().reveal('.container-fluid', {delay: 100} );
ScrollReveal().reveal('.articulos', {delay: 250} );
ScrollReveal().reveal('#zapas-topper', {delay: 200} );
ScrollReveal().reveal('.compra', {delay: 150} );

