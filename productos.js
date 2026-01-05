function guardarProducto() {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  let nombre = document.getElementById("nombreProducto").value;
  let precio = document.getElementById("precioProducto").value;

  if (nombre === "" || precio === "") {
    alert("Complete los campos");
    return;
  }

  productos.push({ nombre, precio });
  localStorage.setItem("productos", JSON.stringify(productos));

  mostrarProductos();
}

function mostrarProductos() {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  productos.forEach((p, i) => {
    lista.innerHTML += `
      <li class="list-group-item">
        ${p.nombre} - $${p.precio}
      </li>
    `;
  });
}

mostrarProductos();
