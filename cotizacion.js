import { database } from "./firebase.js";
import {
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let total = 0;
let productosCotizados = [];

function cargarProductos() {
  const select = document.getElementById("productosSelect");

  onValue(ref(database, "productos"), (snapshot) => {
    select.innerHTML = '<option value="">Seleccione un producto</option>';

    snapshot.forEach((child) => {
      const p = child.val();

      const option = document.createElement("option");
      option.value = JSON.stringify(p);
      option.textContent = `${p.nombre} - $${p.precio}`;

      select.appendChild(option);
    });
  });
}

window.agregarProducto = function () {
  const select = document.getElementById("productosSelect");
  const cantidad = Number(document.getElementById("cantidad").value);

  if (!select.value || cantidad <= 0) {
    alert("Datos inválidos");
    return;
  }

  const producto = JSON.parse(select.value);
  const subtotal = producto.precio * cantidad;

  total += subtotal;

  productosCotizados.push({
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad,
    subtotal
  });

  document.getElementById("detalle").innerHTML += `
    <li class="list-group-item">
      ${producto.nombre} - $${producto.precio} x ${cantidad} = $${subtotal}
    </li>
  `;

  document.getElementById("total").innerText = total.toFixed(2);
};

window.guardarCotizacion = function () {
  if (productosCotizados.length === 0) {
    alert("No hay productos");
    return;
  }

  push(ref(database, "cotizaciones"), {
    fecha: new Date().toLocaleString(),
    total,
    productos: productosCotizados
  });

  alert("Cotización guardada");
};

cargarProductos();