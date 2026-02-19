import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { create, getAll, getById, remove, update } from "../store/memoryStore";
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

const createExpense = (req: Request, res: Response): void => {
  const { amount, category, date, description } = req.body as {
    amount?: number;
    category?: string;
    date?: string;
    description?: string;
  };

  const parsedAmount = Number(amount);
  if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    res.status(400).json({ message: "Invalid amount" });
    return;
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
    res.status(400).json({ message: "Invalid category" });
    return;
  }

  if (!date || typeof date !== "string") {
    res.status(400).json({ message: "Invalid date" });
    return;
  }
  const parsedDate = new Date(date).getTime();
  if (Number.isNaN(parsedDate)) {
    res.status(400).json({ message: "Invalid date" });
    return;
  }

  if (description && typeof description !== "string") {
    res.status(400).json({ message: "Invalid description" });
    return;
  }

  const newExpense: Expense = {
    id: uuidv4(),
    amount: parsedAmount,
    category: category.trim(),
    date,
    description: description?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  const created = create(newExpense);
  res.status(201).json(created);
};

const getParamId = (req: Request): string | undefined => {
  const rawId = req.params.id;
  if (Array.isArray(rawId)) {
    return rawId[0];
  }
  return rawId;
};

const updateExpense = (req: Request, res: Response): void => {
  const id = getParamId(req);
  if (!id) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const existing = getById(id);
  if (!existing) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }

  const { amount, category, date, description } = req.body as {
    amount?: number;
    category?: string;
    date?: string;
    description?: string;
  };

  if (amount !== undefined) {
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      res.status(400).json({ message: "Invalid amount" });
      return;
    }
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim() === "") {
      res.status(400).json({ message: "Invalid category" });
      return;
    }
  }

  if (date !== undefined) {
    if (typeof date !== "string") {
      res.status(400).json({ message: "Invalid date" });
      return;
    }
    const parsedDate = new Date(date).getTime();
    if (Number.isNaN(parsedDate)) {
      res.status(400).json({ message: "Invalid date" });
      return;
    }
  }

  if (description !== undefined && typeof description !== "string") {
    res.status(400).json({ message: "Invalid description" });
    return;
  }

  const updated = update(id, {
    amount: amount !== undefined ? Number(amount) : undefined,
    category: category !== undefined ? category.trim() : undefined,
    date,
    description: description !== undefined ? description.trim() || undefined : undefined,
  });

  if (!updated) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }

  res.status(200).json(updated);
};

const deleteExpense = (req: Request, res: Response): void => {
  const id = getParamId(req);
  if (!id) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const deleted = remove(id);
  if (!deleted) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }
  res.status(204).send();
};

export { getExpenses, createExpense, updateExpense, deleteExpense };
