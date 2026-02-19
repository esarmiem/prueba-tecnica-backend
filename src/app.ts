import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getAll } from "./store/memoryStore";
import expensesRouter from "./routes/expenses";

dotenv.config();
console.log("✅ [Success]: Memory store initialized", getAll());

const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN;
const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: isProduction && allowedOrigin ? allowedOrigin : "*",
  })
);
app.use(express.json());
app.use("/api/expenses", expensesRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
