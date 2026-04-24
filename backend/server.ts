import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./src/database/database";

const PORT = 3500;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

async function start() {
  try {
    await db.init();
    app.listen(PORT, () => {
      console.info(`➜  Local: http://localhost:${PORT}`);
      console.info(`➜  press ^C to stop`);
    });
  } catch (e) {
    console.error(`Something went wrong. Error: ${e}`);
    process.exit(1);
  }
}
start();
