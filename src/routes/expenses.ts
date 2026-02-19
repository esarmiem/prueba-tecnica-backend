import { Router } from "express";
import { createExpense, getExpenses } from "../controllers/expenseController";

const router = Router();

router.get("/", getExpenses);
router.post("/", createExpense);

export default router;
