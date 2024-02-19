import PDFDocument from "pdfkit";

function subtotal(price: number, quantity: number, tva: number): number {
  // price est en HT
  // on rajoute la TVA pour le prix TTC
  const tvaPercent = tva / 100;
  const totalTva = price * tvaPercent;
  return (price + totalTva) * quantity;
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
  pdf: string,
  name_file: string
) {
  const totalPrice = subtotal(price, quantity, tva);
  const doc = new PDFDocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc.fontSize(24).text(`${type} n°${id}`);
  doc.fontSize(12).text(`Date ${new Date().toLocaleString()}`);
  //
  doc.fontSize(16).text(`Entreprise Nozama`);
  doc.fontSize(12).text(`4 rue des champs de fleurs`);
  doc.fontSize(12).text(`75003`);
  doc.fontSize(12).text(`Tél : 01.43.66.66.66`);
  //
  doc.fontSize(16).text(`Informations du client`, { align: "right" });
  doc
    .fontSize(14)
    .text(`Monsieur/Madame ${firstname} ${lastname}`, { align: "right" });
  doc.fontSize(14).text(`${address}`, { align: "right" });
  doc.fontSize(14).text(`${postal_code}`, { align: "right" });
  doc.fontSize(14).text(`${town}`, { align: "right" });
  doc.fontSize(14).text(`${country}`, { align: "right" });
  //
  doc.fontSize(16).text(`Produit/service`);
  doc.fontSize(16).text(`${name}`);
  //
  doc.fontSize(16).text(`Prix unitaire HT`);
  doc.fontSize(16).text(`${price.toFixed(2)}`);
  //
  doc.fontSize(16).text(`Quantité`);
  doc.fontSize(16).text(`${quantity}`);
  //
  doc.fontSize(16).text(`TVA`);
  doc.fontSize(16).text(`${tva}`);
  //
  doc.fontSize(16).text(`Prix HT`);
  doc.fontSize(16).text(`${(price * quantity).toFixed(2)}`);
  //
  doc.fontSize(16).text(`TOTAL TTC`);
  doc.fontSize(16).text(`${totalPrice.toFixed(2)}`);
  doc.end();
}
