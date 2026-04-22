import express from "express";

const PORT = 3500;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.info(`➜  Local: http://localhost:${PORT}`);
  console.info(`➜  press ^C to stop`);
});
