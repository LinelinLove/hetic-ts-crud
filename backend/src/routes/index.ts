import { type Request, type Response } from "express";
import { Router } from "express";
import type Invoice from "../types/invoice";
import * as invoiceModel from "../models/invoice";
import { connection } from "../db-config";
import { RowDataPacket } from "mysql2";

export const router = Router();

// GET ALL
router.get("/invoices", async (req: Request, res: Response) => {
  invoiceModel.findAllInvoices((error: Error, invoices: Invoice[]) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ data: invoices });
  });
});

// GET BY ID
router.get("/invoice/:id", async (req: Request, res: Response) => {
  const invoiceId: number = Number(req.params.id);
  invoiceModel.findOneInvoice(invoiceId, (error: Error, invoice: Invoice) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ data: invoice });
  });
});

// POST
router.post("/invoices", async (req: Request, res: Response) => {
  try {
    const invoiceId: number = Number(req.body.id);
    const invoiceType: string = req.body.type;
    const invoiceFirstname: string = req.body.firstname;
    const invoiceLastname: string = req.body.lastname;
    const invoiceAddress: string = req.body.address;
    const invoiceCountry: string = req.body.country;
    const invoiceTown: string = req.body.town;
    const invoicePostal_code: number = req.body.postal_code;
    const invoiceName: string = req.body.name;
    const invoicePrice: number = Number(req.body.price);
    const invoiceQuantity: number = Number(req.body.quantity);
    const invoiceTva: number = Number(req.body.tva);
    const invoicePdf: string = req.body.pdf;
    const invoiceName_file: string = req.body.name_file;

    invoiceModel.createInvoice(
      invoiceId,
      invoiceType,
      invoiceFirstname,
      invoiceLastname,
      invoiceAddress,
      invoiceCountry,
      invoiceTown,
      invoicePostal_code,
      invoiceName,
      invoicePrice,
      invoiceQuantity,
      invoiceTva,
      invoicePdf,
      invoiceName_file,
      (error: Error, invoiceId: number) => {
        if (error) {
          console.error(error);
        }
      }
    );
    return res.status(200).json({ invoiceId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT
router.put("/invoice/:id", async (req: Request, res: Response) => {
  const invoiceId: number = Number(req.params.id);
  const invoiceType: string = req.body.type;
  const invoiceFirstname: string = req.body.firstname;
  const invoiceLastname: string = req.body.lastname;
  const invoiceAddress: string = req.body.address;
  const invoiceCountry: string = req.body.country;
  const invoiceTown: string = req.body.town;
  const invoicePostal_code: number = req.body.postal_code;
  const invoiceName: string = req.body.name;
  const invoicePrice: number = req.body.price;
  const invoiceQuantity: number = req.body.quantity;
  const invoiceTva: number = req.body.tva;
  const invoicePdf: string = req.body.pdf;
  const invoiceName_file: string = req.body.name_file;

  invoiceModel.updateInvoice(
    invoiceId,
    invoiceType,
    invoiceFirstname,
    invoiceLastname,
    invoiceAddress,
    invoiceCountry,
    invoiceTown,
    invoicePostal_code,
    invoiceName,
    invoicePrice,
    invoiceQuantity,
    invoiceTva,
    invoicePdf,
    invoiceName_file,
    (error: Error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(200).send();
    }
  );
});

// DELETE
router.delete("/invoice/:id", async (req: Request, res: Response) => {
  const invoiceId: number = Number(req.params.id);
  invoiceModel.deleteInvoice(invoiceId, (error: Error) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).send();
  });
});

// GET PDF
router.get("/download/:id", async (req: Request, res: Response) => {
  try {
    const invoiceId: number = Number(req.params.id);

    // Requête pour récupérer les détails de la facture par son ID
    const selectQuery = "SELECT pdf, name_file FROM invoice WHERE id = ?";
    connection.query(selectQuery, [invoiceId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      // Assurez-vous que les résultats sont du type attendu
      const rows = results as RowDataPacket[];

      if (rows.length === 0) {
        return res.status(404).json({ message: "Facture non trouvée" });
      }

      const invoiceDetails = rows[0];

      // Récupérer les données du PDF et le nom du fichier depuis la base de données
      const pdfBuffer = Buffer.from(invoiceDetails.pdf, "base64");
      const fileName = invoiceDetails.name_file;

      // Définir les en-têtes pour forcer le téléchargement du fichier
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

      // Envoyer le contenu du PDF en réponse
      res.status(200).send(pdfBuffer);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
