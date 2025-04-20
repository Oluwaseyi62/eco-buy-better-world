import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware/errorMiddleware";
import dbConnection from "./db";
import router from "./routes/index";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();
// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
