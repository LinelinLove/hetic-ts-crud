import dotenv from "dotenv";
dotenv.config();
import { createConnection, Connection } from "mysql2";

export const connection: Connection = createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
