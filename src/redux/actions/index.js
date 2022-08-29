export const LOGIN = 'LOGIN';
export const OPTION_CURRENCIES = 'OPTION_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

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
