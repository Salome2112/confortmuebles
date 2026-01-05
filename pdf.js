function generarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("ConfortMuebles", 20, 20);
  pdf.text("Documento generado", 20, 40);

  pdf.save("documento.pdf");
}
