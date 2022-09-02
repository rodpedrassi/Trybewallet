import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('first', () => {
  test('Verifica se o email e total estão renderizados corretamente', () => {
    const initialState = {
      user: {
        email: 'rodpedrassi@gmail.com',
      },
      wallet: {
        totalExpense: '123.23',
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const email = screen.getByText(/rodpedrassi@gmail.com/i);
    const totalExpense = screen.getByText(/123.23/i);

    expect(email).toBeInTheDocument();
    expect(totalExpense).toBeInTheDocument();
  });
});
