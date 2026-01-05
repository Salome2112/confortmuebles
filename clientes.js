function guardarCliente() {
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;

  clientes.push({nombre, telefono});
  localStorage.setItem("clientes", JSON.stringify(clientes));

  mostrarClientes();
}

function mostrarClientes() {
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  let lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  clientes.forEach(c => {
    lista.innerHTML += `<li>${c.nombre} - ${c.telefono}</li>`;
  });
}

mostrarClientes();
