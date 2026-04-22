const form = document.getElementById("formProducto");
const lista = document.getElementById("lista");

let productos = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;
  const imagenInput = document.getElementById("imagen");

  const file = imagenInput.files[0];

  if (!file) {
    alert("Sube una imagen");
    return;
  }

  const reader = new FileReader();

  reader.onload = function() {
    const producto = {
      nombre,
      precio,
      categoria,
      imagen: reader.result
    };

    productos.push(producto);
    mostrarProductos();
    form.reset();
  };

  reader.readAsDataURL(file);
});

function mostrarProductos() {
  lista.innerHTML = "";

  productos.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <img src="${p.imagen}" width="100">
        <h3>${p.nombre}</h3>
        <p>L ${p.precio}</p>
        <small>${p.categoria}</small>
      </div>
    `;
  });
}
