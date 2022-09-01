import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  OPTION_CURRENCIES,
  SAVE_EXPENSES,
  SAVE_TOTAL_EXPENSES,
  SEND_EXPENSE_TO_EDIT,
} from '../actions';

const initialState = {
  currencies: [],
  totalExpense: '0',
  expenses: [],
  editExpense: {},
  isEditing: false,
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

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.value.id),
      totalExpense: (state.totalExpense - action.value.convertedValue).toFixed(2),
    };

  case SEND_EXPENSE_TO_EDIT:
    return {
      ...state,
      editExpense: action.value,
      isEditing: true,

    };

  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((e) => e.id !== action.value.id), action.value]
        .sort((a, b) => Number(a.id) - Number(b.id)),
      totalExpense: (Number(state.totalExpense)
      + Number(action.value.editedValue)).toFixed(2),
      isEditing: false,
    };

  default: return state;
  }
}

export default walletReducer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
