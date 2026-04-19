let carrito = [];
let productos = [];

fetch("productos.json")
.then(res => res.json())
.then(data => {
  productos = data.items;
  mostrar(productos);
});

function mostrar(lista){
  const cont = document.getElementById("productos");
  cont.innerHTML = "";

  lista.forEach(p => {
    cont.innerHTML += `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>L ${p.precio}</p>
        <p class="descripcion">${p.descripcion || ""}</p>
        ${
          p.disponible
          ? `<button onclick="agregar('${p.nombre}', ${p.precio})">Agregar</button>`
          : `<button class="agotado" disabled>Agotado</button>`
        }
      </div>
    `;
  });
}

function agregar(nombre, precio){
  carrito.push({nombre, precio});
  actualizar();
}

function actualizar(){
  document.getElementById("contador").textContent = carrito.length;
}

function abrirCarrito(){
  document.getElementById("modalCarrito").style.display = "block";
  let lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(p=>{
    lista.innerHTML += `<li>${p.nombre} - L${p.precio}</li>`;
    total += p.precio;
  });

  document.getElementById("total").textContent = "Total: L " + total;
}

function cerrarCarrito(){
  document.getElementById("modalCarrito").style.display = "none";
}

function comprarWhatsApp(){
  let mensaje = "Hola, quiero cotizar estos productos:\n";
  let total = 0;

  carrito.forEach(p=>{
    mensaje += `- ${p.nombre} L${p.precio}\n`;
    total += p.precio;
  });

  mensaje += `\nTotal: L${total}`;

  // Reemplaza el número por el tuyo
  window.open("https://wa.me/504XXXXXXXX?text=" + encodeURIComponent(mensaje));
}

function filtrar(cat){
  if(cat==="todos") mostrar(productos);
  else mostrar(productos.filter(p=>p.categoria===cat));
}

function buscar(){
  let texto = document.getElementById("buscador").value.toLowerCase();
  mostrar(productos.filter(p=>p.nombre.toLowerCase().includes(texto)));
}
