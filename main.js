// BOTON COMPRAR

function comprar(){ 
    location.href = "compra.html";

}
// REALIZAR COMPRA

function realizarCompra(){
    alert("Gracias por adquirir su producto");
}

function volver(){
    location.href = "index.html"
}

const botonCompra = document.getElementById("comprador");
let texto = document.getElementById("probanding")

botonCompra.addEventListener("click", () =>{
    texto.textContent = "Probandoo";
})

// SCROLL REVEAL

ScrollReveal().reveal('.container-fluid', {delay: 100} );
ScrollReveal().reveal('.articulos', {delay: 250} );
ScrollReveal().reveal('#zapas-topper', {delay: 200} );
ScrollReveal().reveal('.compra', {delay: 150} );
