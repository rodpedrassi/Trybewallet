import { LOGIN } from '../actions';

const initialState = {
  email: '',
  password: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return action.value;
  default:
    return state;
  }
}

export default userReducer;

// Esse reducer será responsável por tratar as informações da pessoa usuária
