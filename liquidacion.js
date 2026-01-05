document.getElementById("totalLiquidacion").innerText =
  localStorage.getItem("totalCotizacion") || 0;

function pagar() {
  alert("Liquidación realizada correctamente");
}
