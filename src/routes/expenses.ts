import { Router } from "express";
import { getExpenses } from "../controllers/expenseController";

const router = Router();

router.get("/", getExpenses);

export default router;
