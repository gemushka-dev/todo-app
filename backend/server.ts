import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./src/database/database";
import { errorMiddleware } from "./src/error/errorMiddleware";
import { usersRouter } from "./src/users/usersRouter";
import { todosRouter } from "./src/todos/todosRouter";

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
app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use(errorMiddleware);

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
