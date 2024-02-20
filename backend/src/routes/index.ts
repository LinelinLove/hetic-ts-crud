import { type Request, type Response } from "express";
import { Router } from "express";
import type Invoice from "../types/invoice";
import * as invoiceModel from "../models/invoice";
import { buildPDF } from "../service/pdf-service";

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
    (error: Error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(200).json({ Updated: invoiceId });
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
router.get("/invoice/download/:id", (req: Request, res: Response) => {
  const invoiceId: number = Number(req.params.id);
  invoiceModel.findOneInvoice(invoiceId, (error: Error, invoice: Invoice) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment;filename=invoice.pdf`,
    });
    buildPDF(
      (chunk: any) => stream.write(chunk),
      () => stream.end(),
      invoice
    );
    // return res.status(200).json({ data: invoice });
  });
});
