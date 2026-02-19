import { Request, Response } from "express";
import { getAll } from "../store/memoryStore";
import { Expense } from "../models/expense";

const getExpenses = (req: Request, res: Response): void => {
  const { category, startDate, endDate } = req.query;
  let expenses: Expense[] = getAll();

  if (typeof category === "string" && category.trim() !== "") {
    expenses = expenses.filter((expense) => expense.category === category);
  }

  if (typeof startDate === "string" && startDate.trim() !== "") {
    const start = new Date(startDate).getTime();
    if (Number.isNaN(start)) {
      res.status(400).json({ message: "Invalid startDate" });
      return;
    }
    expenses = expenses.filter(
      (expense) => new Date(expense.date).getTime() >= start
    );
  }

  if (typeof endDate === "string" && endDate.trim() !== "") {
    const end = new Date(endDate).getTime();
    if (Number.isNaN(end)) {
      res.status(400).json({ message: "Invalid endDate" });
      return;
    }
    expenses = expenses.filter(
      (expense) => new Date(expense.date).getTime() <= end
    );
  }

  res.status(200).json(expenses);
};

export { getExpenses };
