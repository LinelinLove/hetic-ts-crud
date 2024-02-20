import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import Express from "express";
import { router } from "./routes";
import { json } from "body-parser";
import { connection } from "./db-config";

const PORT = process.env.PORT || 5050;
const app = Express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(json());
app.use(router);

connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("App connected to MySQL.");
  }
});

app.listen(PORT, () => {
  console.info("API Listening on port " + PORT);
});
