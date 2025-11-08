// src/lib/generateInvoicePDF.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generateInvoicePDF = async (order: any, element: HTMLElement): Promise<Blob> => {
  const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  if (!canvas) throw new Error("❌ Gagal render canvas dari elemen invoice");

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 190;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 10;

  pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 10;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  return pdf.output("blob");
};