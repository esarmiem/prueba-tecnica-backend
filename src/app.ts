import express from "express";
import dotenv from "dotenv";
import { getAll } from "./store/memoryStore";
import expensesRouter from "./routes/expenses";

dotenv.config();
console.log("✅ [Success]: Memory store initialized", getAll());

const app = express();

app.use(express.json());
app.use("/api/expenses", expensesRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
