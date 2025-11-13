// src/lib/generateInvoicePDF.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Hapus semua warna berbasis oklch agar tidak error saat dirender html2canvas
 */
function sanitizeColors(root: HTMLElement) {
  const all = root.querySelectorAll<HTMLElement>("*");
  all.forEach((el) => {
    const style = window.getComputedStyle(el);
    const props = ["color", "backgroundColor", "borderColor", "outlineColor", "fill", "stroke"];
    props.forEach((p) => {
      const val = (style as any)[p];
      if (typeof val === "string" && val.includes("oklch")) {
        el.style.setProperty(p, "#000", "important");
      }
    });
    const inline = el.getAttribute("style");
    if (inline && inline.includes("oklch")) {
      el.setAttribute("style", inline.replace(/oklch\([^)]*\)/g, "#000"));
    }
  });
}

/**
 * Generate PDF invoice tanpa ganggu halaman utama (pakai iframe offscreen)
 */
export const generateInvoicePDF = async (order: any, element: HTMLElement): Promise<Blob> => {
  if (!element) throw new Error("❌ Element tidak ditemukan");

  // 🧱 1. Buat iframe tersembunyi
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.top = "-10000px";
  iframe.style.left = "-10000px";
  iframe.style.width = "210mm";
  iframe.style.height = "297mm";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  document.body.appendChild(iframe);

  // 🕓 2. Tunggu iframe ready
  await new Promise<void>((resolve, reject) => {
    iframe.onload = () => resolve();
    setTimeout(() => {
      if (iframe.contentDocument) resolve();
      else reject(new Error("Unable to find iframe window"));
    }, 150);
  });

  const doc = iframe.contentDocument;
  if (!doc) throw new Error("❌ Iframe document tidak bisa diakses");

  // 🧾 3. Clone dan append element
  const clone = element.cloneNode(true) as HTMLElement;
  doc.body.appendChild(clone);
  doc.body.style.background = "#ffffff";
  sanitizeColors(clone);

  // Tunggu DOM settle
  await new Promise((r) => setTimeout(r, 100));

  try {
    // 🧩 4. Render ke canvas
    const canvas = await html2canvas(clone, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // 🧹 5. Bersihkan iframe
    iframe.remove();

    // 📄 6. Generate PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 297;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf.output("blob");
  } catch (err) {
    console.error("❌ generateInvoicePDF ERROR:", err);
    iframe.remove();
    throw err;
  }
};
