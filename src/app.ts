import express from "express";
import dotenv from "dotenv";
import { getAll } from "./store/memoryStore";

dotenv.config();
console.log("✅ [Success]: Memory store initialized", getAll());

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
