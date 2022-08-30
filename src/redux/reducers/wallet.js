import { OPTION_CURRENCIES, SAVE_EXPENSES, SAVE_TOTAL_EXPENSES } from '../actions';

const initialState = {
  currencies: [],
  totalExpense: '0',
  expenses: [],
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case OPTION_CURRENCIES:
    return {
      ...state,
      currencies: action.value,
    };
  case SAVE_TOTAL_EXPENSES:
    return {
      ...state,
      totalExpense: action.value,
    };

  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  default: return state;
  }
}

export default walletReducer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
