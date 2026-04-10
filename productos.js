import { database } from "./firebase.js";
import {
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.guardarProducto = function () {
  const nombre = document.getElementById("nombreProducto").value;
  const precio = document.getElementById("precioProducto").value;

  if (!nombre || !precio) {
    alert("Complete los campos");
    return;
  }

  push(ref(database, "productos"), {
    nombre,
    precio: Number(precio)
  });

  alert("Producto guardado");
};

function mostrarProductos() {
  const lista = document.getElementById("listaProductos");

  onValue(ref(database, "productos"), (snapshot) => {
    lista.innerHTML = "";

    snapshot.forEach((child) => {
      const p = child.val();
      lista.innerHTML += `
        <li class="list-group-item">
          ${p.nombre} - $${p.precio}
        </li>
      `;
    });
  });
}

mostrarProductos();
