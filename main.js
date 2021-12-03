// PEDIR DATOS DEL JSON
const items = document.getElementById("items");
const modal = document.querySelector(".modal-body");
const templateCard = document.getElementById("template-card").content;

const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})
items.addEventListener("click", e => {
    addCarrito(e);
})

const fetchData = async () => {
    try {
        const res = await fetch("api.json");
        const data = await res.json();
        pintarCards(data);

    }
    catch (error) {
        console.log(error);
    }
}
// PINTAR CARTAS 
const pintarCards = data => {
    data.forEach(producto => {

        templateCard.querySelector("h5").textContent = producto.nombre;
        templateCard.querySelector("p").textContent = producto.info;
        templateCard.querySelector("span").textContent = producto.precio;
        templateCard.querySelector("img").setAttribute("src", producto.img);
        templateCard.querySelector(".card").setAttribute("id", producto.idmarca);
        templateCard.querySelector(".btn-primary").dataset.id = producto.id;
        templateCard.querySelector(".btn-primary").setAttribute("data-bs-toggle", "modal");
        templateCard.querySelector(".btn-primary").setAttribute("data-bs-target", "#staticBackdrop");


        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    items.appendChild(fragment);
}

// AÑADIR AL CARRITO + PINTAR MODAL
const addCarrito = e => {
    if (e.target.classList.contains("btn-primary")) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {

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

// FILTRO DE BUSQUEDA

function busqueda() {
    let buscador = document.getElementById("search-box");
    let cartasTodas = document.querySelectorAll(".card-title");
    let texto = buscador.value.toUpperCase();

    for (let i = 0; i < cartasTodas.length; i++) {
        let resultado = cartasTodas[i].innerHTML.includes(texto);
        let padre = cartasTodas[i].parentNode;
        let superPadre = padre.parentNode;

        if (resultado == false) {
            superPadre.style.display = "none";

        }
        else {
            superPadre.style.display = "inline-block";
        }

    }
}

// TARJETA DE CREDITO

let numeroTarjeta = document.getElementById("numeroTarjeta");


numeroTarjeta.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;

    numeroTarjeta.value = valorInput
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .replace(/([0-9]{4})/g, "$1 ");
})

let cvv = document.getElementById("cvv");

cvv.addEventListener("keyup", (e) => {
    let valorInputDos = e.target.value;

    cvv.value = valorInputDos
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .replace(/([0-9]{3})/g, "$1 ");
})

const comprar = () => {
    const mes = document.getElementById("selectMes").value
    const year = document.getElementById("selectAño").value
    const cvv = document.getElementById("cvv").value

    if ((!numeroTarjeta.value) || (numeroTarjeta.value.length < 16)) {
        alert("Ingrese un número de tarjeta válido (16 dígitos).")

    }
    if(mes > 12 || mes < 0){
        alert("Ingrese un mes válido")
    }
    if(year < 21 || year > 40){
        alert("Ingrese un año válido")
    } 
    if(!cvv || cvv.length < 3 || cvv == 0){
        alert("Ingrese el CVV correcto")
    }
    else{
        alert("Muchas gracias por su compra ficticia!")
    }

}

const mes = document.getElementById("selectMes")


mes.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;

    mes.value = valorInput
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .replace(/([0-9]{4})/g, "$1 ");

     
})

const year = document.getElementById("selectAño")

year.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;

    year.value = valorInput
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .replace(/([0-9]{4})/g, "$1 ");
})

// SCROLL REVEAL

ScrollReveal().reveal('.container-fluid', { delay: 100 });
ScrollReveal().reveal('.articulos', { delay: 250 });
ScrollReveal().reveal('#zapas-topper', { delay: 200 });

