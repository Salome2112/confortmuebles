import { database } from "./firebase.js";
import {
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.guardarCliente = function () {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const email = document.getElementById("email").value;

  if (!nombre || !telefono || !direccion || !email) {
    alert("Complete todos los campos");
    return;
  }

  push(ref(database, "clientes"), {
    nombre,
    telefono,
    direccion,
    email
  });

  alert("Cliente guardado");
};

function mostrarClientes() {
  const lista = document.getElementById("listaClientes");

  onValue(ref(database, "clientes"), (snapshot) => {
    lista.innerHTML = "";

    snapshot.forEach((child) => {
      const c = child.val();
      lista.innerHTML += `<li>${c.nombre} - ${c.telefono}</li>`;
    });
  });
}

mostrarClientes();