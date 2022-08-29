import { OPTION_CURRENCIES, SAVE_EXPENSES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case OPTION_CURRENCIES:
    return {
      ...state,
      currencies: action.value,
    };

  case SAVE_EXPENSES:
    console.log(state);
    return {
      ...state,
      expenses: action.value,
    };
  default: return state;
  }
}

export default walletReducer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
