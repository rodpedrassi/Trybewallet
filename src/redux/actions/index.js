export const LOGIN = 'LOGIN';
export const OPTION_CURRENCIES = 'OPTION_CURRENCIES';

export const login = (value) => ({
  type: LOGIN,
  value,
});

export const optionCurrencies = (value) => ({
  type: OPTION_CURRENCIES,
  value,
});
