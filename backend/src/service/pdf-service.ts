import PDFDocument from "pdfkit";

function subtotal(price: number, quantity: number, tva: number): number {
  const tvaPercent = Number(tva) / 100;
  const totalTva = Number(price) * tvaPercent;
  return (Number(price) + totalTva) * Number(quantity);
}
export function buildPDF(
  dataCallback: any,
  endCallback: any,
  id: number,
  type: string,
  firstname: string,
  lastname: string,
  address: string,
  country: string,
  town: string,
  postal_code: number,
  name: string,
  price: number,
  quantity: number,
  tva: number,
  pdf: string
) {
  const totalPrice = subtotal(price, quantity, tva);
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
      .text(price_ht, 250, y, { width: 90, align: "right" })
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
    .text(`${type} n°${id}`, 50, 120)
    .fontSize(12)
    .text(`Date ${new Date().toLocaleString()}`, 50, 155);

  generateHr(doc, 185);

  doc.fontSize(16).text(`Informations du client`, 50, 200);
  doc
    .fontSize(12)
    .text(`${firstname} ${lastname}`, 50, 220)
    .text(`${address}`, 50, 235)
    .text(`${town}, ${postal_code}`, 50, 250)
    .text(`${country}`, 50, 265);

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

  generateHr(doc, invoiceTableTop + 20);

  generateTableRow(
    doc,
    360,
    name,
    price.toFixed(2),
    quantity,
    (price * quantity).toFixed(2),
    tva.toFixed(2),
    totalPrice.toFixed(2)
  );

  if (type === "Devis") {
    generateFooter(doc);
  }

  doc.end();
}
