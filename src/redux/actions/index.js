export const LOGIN = 'LOGIN';
export const OPTION_CURRENCIES = 'OPTION_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_TOTAL_EXPENSES = 'SAVE_TOTAL_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SEND_EXPENSE_TO_EDIT = 'SEND_EXPENSE_TO_EDIT';

export const login = (value) => ({
  type: LOGIN,
  value,
});

export const optionCurrencies = (value) => ({
  type: OPTION_CURRENCIES,
  value,
});

export const saveExpenses = (value) => ({
  type: SAVE_EXPENSES,
  value,
});

export const saveTotalExpenses = (value) => ({
  type: SAVE_TOTAL_EXPENSES,
  value,
});

export const deleteExpense = (value) => ({
  type: DELETE_EXPENSE,
  value,
});

export const editExpense = (value) => ({
  type: EDIT_EXPENSE,
  value,
});

export const sendExpenseToEdit = (value) => ({
  type: SEND_EXPENSE_TO_EDIT,
  value,
});
