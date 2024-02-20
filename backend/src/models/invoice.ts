import type Invoice from "../types/invoice";
import { connection } from "../db-config";
import { type ResultSetHeader as OkPacket, type RowDataPacket } from "mysql2";
import { buildPDF } from "../service/pdf-service";
import fs from "fs";

export const createInvoice = (
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
  callback: Function
) => {
  const queryString =
    "INSERT INTO invoice (type, firstname, lastname, address, country, town, postal_code, name, price, quantity, tva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    queryString,
    [
      type,
      firstname,
      lastname,
      address,
      country,
      town,
      postal_code,
      name,
      price,
      quantity,
      tva,
    ],
    (error, result) => {
      // si erreur, on l'a donne au controller
      if (error) {
        callback(error);
      }
      // result arrive sous forme de RowDataPacket, pas exploitable, cast en OkPacket
      // si pas d'erreur, accès au insertId
      console.log(result);
      const inserId = (result as OkPacket)?.insertId;

      callback(null, inserId);
    }
  );
};

export const findOneInvoice = (invoiceId: number, callback: Function) => {
  const queryString = "SELECT * FROM invoice where id = ?";
  connection.query(queryString, [invoiceId], (error, result) => {
    if (error) {
      callback(error);
    }
    // RowDataPacket est un type classique de SQL
    // on récupère la première chose, après il ne peut y en avoir que un de cet id, si c'est callback
    const row = (result as RowDataPacket)[0];
    const invoice: Invoice = {
      id: row.id,
      type: row.type,
      firstname: row.firstname,
      lastname: row.lastname,
      address: row.address,
      country: row.country,
      town: row.town,
      postal_code: row.postal_code,
      name: row.name,
      price: row.price,
      quantity: row.quantity,
      tva: row.tva,
      date: row.date,
    };
    // on le renvoie au callback le résultat
    callback(null, invoice);
  });
};

export const findAllInvoices = (callback: Function) => {
  const queryString = "SELECT * FROM invoice ORDER BY date DESC;";
  connection.query(queryString, (error, result) => {
    if (error) {
      callback(error);
    }

    const rows = result as RowDataPacket[];
    const invoices: Invoice[] = [];
    rows.forEach((row) => {
      const invoice: Invoice = {
        id: row.id,
        type: row.type,
        date: row.date,
        firstname: row.firstname,
        lastname: row.lastname,
        address: row.address,
        country: row.country,
        town: row.town,
        postal_code: row.postal_code,
        name: row.name,
        price: row.price,
        quantity: row.quantity,
        tva: row.tva,
      };
      invoices.push(invoice);
    });
    callback(null, invoices);
  });
};

export const updateInvoice = (
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
  callback: Function
) => {
  const updateQuery =
    "UPDATE invoice SET type = ?, firstname = ?, lastname = ?, address = ?, country = ?, town = ?, postal_code = ?, name = ?, price = ?, quantity = ?, tva = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [
      type,
      firstname,
      lastname,
      address,
      country,
      town,
      postal_code,
      name,
      price,
      quantity,
      tva,
      id,
    ],
    (updateError) => {
      if (updateError) {
        callback(updateError);
      } else {
        callback(null, id);
      }
    }
  );
};

export const deleteInvoice = (invoiceId: number, callback: Function) => {
  const queryString = "DELETE FROM invoice WHERE id = ?";
  connection.query(queryString, [invoiceId], (error) => {
    if (error) {
      callback(error);
    }

    callback(null);
  });
};
