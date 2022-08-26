const initialState = [];

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'a':
    return [...state];
  default: return state;
  }
}

export default walletReducer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
