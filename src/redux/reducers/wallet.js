import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  OPTION_CURRENCIES,
  SAVE_EXPENSES,
  SEND_EXPENSE_TO_EDIT,
} from '../actions';

const initialState = {
  currencies: [],
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

  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.value.id),
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
      expenses:
      [
        ...state.expenses
          .filter((e) => e.id !== action.value.id),
        action.value,
      ]
        .sort((a, b) => Number(a.id) - Number(b.id)),
      isEditing: false,
    };

  default: return state;
  }
}

export default walletReducer;
