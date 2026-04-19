async function cargarProductos() {
    const res = await fetch("productos.json");
    const productos = await res.json();
    window.lista = productos;
    mostrarProductos(productos);
}

function mostrarProductos(lista) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
        <div class="card">
            <img src="${p.imagen}">
            <h3>${p.nombre}</h3>
            <p>L.${p.precio}</p>
            <p class="${p.estado === 'Disponible' ? 'disponible':'agotado'}">${p.estado}</p>
            ${
                p.estado === "Disponible"
                ? `<button onclick="comprar('${p.nombre}',${p.precio})">Comprar</button>`
                : `<p class="agotado">No disponible</p>`
            }
        </div>`;
    });
}

function filtrar(cat) {
    if(cat === "todos") {
        mostrarProductos(window.lista);
    } else {
        mostrarProductos(window.lista.filter(p => p.categoria === cat));
    }
}

function comprar(nombre, precio) {
    let carrito = [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  alert("Producto agregado");
}

function comprarWhatsApp() {
  let mensaje = "Hola, quiero cotizar:\n";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} L${p.precio}\n`;
  });

  let url = "https://wa.me/504XXXXXXXX?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}
    const mensaje = `Hola, quiero comprar:%0AProducto: ${nombre}%0APrecio: L.${precio}`;
    window.open(`https://wa.me/504TU_NUMERO?text=${mensaje}`);
}

cargarProductos();
