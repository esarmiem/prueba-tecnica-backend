import { Expense } from "../models/expense";

const expenses: Expense[] = [];

const getAll = (): Expense[] => {
  return [...expenses];
};

const getById = (id: string): Expense | undefined => {
  return expenses.find((expense) => expense.id === id);
};

const create = (expense: Expense): Expense => {
  expenses.push(expense);
  return expense;
};

const update = (id: string, data: Partial<Expense>): Expense | undefined => {
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return undefined;
  }
  const updatedExpense: Expense = { ...expenses[index], ...data };
  expenses[index] = updatedExpense;
  return updatedExpense;
};

const remove = (id: string): boolean => {
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return false;
  }
  expenses.splice(index, 1);
  return true;
};

export { getAll, getById, create, update, remove };
