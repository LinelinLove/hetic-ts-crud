import PDFDocument from "pdfkit";
import Invoice from "../types/invoice";

function subtotal(price: number, quantity: number, tva: number): number {
  const tvaPercent = Number(tva) / 100;
  const totalTva = Number(price) * tvaPercent;
  return (Number(price) + totalTva) * Number(quantity);
}
export function buildPDF(
  dataCallback: any,
  endCallback: any,
  invoice: Invoice
) {
  const totalPrice = subtotal(invoice.price, invoice.quantity, invoice.tva);
  const doc = new PDFDocument();

  function generateHr(doc: PDFKit.PDFDocument, y: number) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

  function generateTableRow(
    doc: PDFKit.PDFDocument,
    y: number,
    item: any,
    price: any,
    quantity: any,
    tva: any,
    price_ht: any,
    price_ttc: any
  ) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(price, 170, y)
      .text(quantity, 200, y, { width: 90, align: "right" })
      .text(price_ht, 270, y, { width: 90, align: "right" })
      .text(tva, 350, y, { width: 90, align: "right" })
      .text(price_ttc, 0, y, { align: "right" });
  }

  function generateFooter(doc: PDFKit.PDFDocument) {
    doc
      .fontSize(10)
      .text("Le paiement est dû dans un délai de 15 jours.", 50, 780, {
        align: "center",
        width: 500,
      });
  }

  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc
    .fontSize(10)
    .text(`Company Inc.`, { align: "right" })
    .text(`4 rue Ipsum`, { align: "right" })
    .text(`Paris, Ile-de-France, 75000`, { align: "right" })
    .text(`Tél : 01.66.66.66.66`, { align: "right" });

  doc
    .fontSize(24)
    .text(`${invoice.type} n°${invoice.id}`, 50, 120)
    .fontSize(12)
    .text(`${new Date().toLocaleString()}`, 50, 145);

  generateHr(doc, 160);

  doc.fontSize(16).text(`Informations du client`, 50, 170);
  doc
    .fontSize(12)
    .text(`${invoice.firstname} ${invoice.lastname}`, 50, 190)
    .text(`${invoice.address}`, 50, 205)
    .text(`${invoice.town}, ${invoice.postal_code}`, 50, 220)
    .text(`${invoice.country}`, 50, 235);

  const invoiceTableTop = 330;
  generateTableRow(
    doc,
    invoiceTableTop,
    "Produit/service",
    "Prix €",
    "Quantité",
    "Prix HT",
    "TVA %",
    "Prix TTC"
  );

  generateHr(doc, invoiceTableTop + 10);

  generateTableRow(
    doc,
    350,
    invoice.name,
    invoice.price.toFixed(2),
    invoice.quantity,
    (invoice.price * invoice.quantity).toFixed(2),
    invoice.tva.toFixed(2),
    totalPrice.toFixed(2)
  );

  if (invoice.type === "Devis") {
    generateFooter(doc);
  }

  doc.end();
}
