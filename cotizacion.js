import { database } from "./firebase.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let total = 0;
let productosCotizados = [];

/* =========================
   CARGAR PRODUCTOS
========================= */
function cargarProductos() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const select = document.getElementById("productosSelect");

  select.innerHTML = '<option value="">Seleccione un producto</option>';

  productos.forEach(p => {
    const option = document.createElement("option");
    option.value = JSON.stringify(p); // guardamos todo el producto
    option.textContent = `${p.nombre} - $${p.precio}`;
    select.appendChild(option);
  });
}

/* =========================
   AGREGAR PRODUCTO
========================= */
window.agregarProducto = function () {
  const select = document.getElementById("productosSelect");
  const cantidad = Number(document.getElementById("cantidad").value);

  if (!select.value) {
    alert("Seleccione un producto");
    return;
  }

  if (cantidad <= 0) {
    alert("Cantidad inválida");
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

/* =========================
   GUARDAR COTIZACIÓN
========================= */
window.guardarCotizacion = function () {
  if (productosCotizados.length === 0) {
    alert("No hay productos en la cotización");
    return;
  }

  const cotizacionRef = ref(database, "cotizaciones");

  push(cotizacionRef, {
    fecha: new Date().toLocaleString(),
    total,
    productos: productosCotizados
  });

  alert("Cotización guardada ✅");

  // Reiniciar
  total = 0;
  productosCotizados = [];
  document.getElementById("detalle").innerHTML = "";
  document.getElementById("total").innerText = "0.00";
};

/* =========================
   INICIAR
========================= */
cargarProductos();
