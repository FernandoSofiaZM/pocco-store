document.addEventListener('DOMContentLoaded', function() {
  let carrito = [];
  let productos = [];

  fetch("productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data.items;
      mostrar(productos);
    });

  function mostrar(lista) {
    const cont = document.getElementById("productos");
    if (!cont) return;
    cont.innerHTML = "";
    lista.forEach(p => {
      cont.innerHTML += `
        <div class="card">
          <img src="${p.imagen}" alt="${p.nombre}">
          <h3>${p.nombre}</h3>
          <p>L ${p.precio}</p>
          <p class="descripcion">${p.descripcion || ""}</p>
          ${p.disponible ? `<button onclick="agregar('${p.nombre}', ${p.precio})">Agregar</button>` : `<button class="agotado" disabled>Agotado</button>`}
        </div>
      `;
    });
  }

  window.agregar = function(nombre, precio) {
    carrito.push({nombre, precio});
    actualizar();
  };

  function actualizar() {
    const contador = document.getElementById("contador");
    if (contador) contador.textContent = carrito.length;
  }

  window.abrirCarrito = function() {
    const modal = document.getElementById("modalCarrito");
    if (!modal) return;
    modal.style.display = "block";
    const lista = document.getElementById("listaCarrito");
    const totalSpan = document.getElementById("total");
    if (!lista || !totalSpan) return;
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach(p => {
      lista.innerHTML += `<li>${p.nombre} - L${p.precio}</li>`;
      total += p.precio;
    });
    totalSpan.textContent = "Total: L " + total;
  };

  window.cerrarCarrito = function() {
    const modal = document.getElementById("modalCarrito");
    if (modal) modal.style.display = "none";
  };

  window.comprarWhatsApp = function() {
    let mensaje = "Hola, quiero cotizar estos productos:\n";
    let total = 0;
    carrito.forEach(p => {
      mensaje += `- ${p.nombre} L${p.precio}\n`;
      total += p.precio;
    });
    mensaje += `\nTotal: L${total}`;
    window.open("https://wa.me/504XXXXXXXX?text=" + encodeURIComponent(mensaje));
  };

  window.filtrar = function(cat) {
    if (cat === "todos") mostrar(productos);
    else mostrar(productos.filter(p => p.categoria === cat));
  };

  window.buscar = function() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    mostrar(productos.filter(p => p.nombre.toLowerCase().includes(texto)));
  };
});
