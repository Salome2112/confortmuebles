let total = 0;

function cargarProductos() {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let select = document.getElementById("productosSelect");

  productos.forEach(p => {
    let option = document.createElement("option");
    option.text = `${p.nombre} - $${p.precio}`;
    option.value = p.precio;
    select.add(option);
  });
}

function agregarProducto() {
  let precio = document.getElementById("productosSelect").value;
  let cantidad = document.getElementById("cantidad").value;

  let subtotal = precio * cantidad;
  total += subtotal;

  document.getElementById("detalle").innerHTML += `
    <li class="list-group-item">
      $${precio} x ${cantidad} = $${subtotal}
    </li>
  `;

  document.getElementById("total").innerText = total;
}

cargarProductos();
