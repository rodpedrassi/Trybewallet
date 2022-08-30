import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Checa a página Carteira', () => {
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

  test('Verifica se o form está renderizado', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valor = screen.getByTestId('value-input');
    const moeda = screen.getByLabelText(/moeda/i);
    const metodo = screen.getByLabelText(/método/i);
    const categoria = screen.getByLabelText(/categoria/i);
    const desc = screen.getByLabelText(/descrição/i);
    const addDespesaButton = screen.getByRole('button', { name: /adicionar/i });

    expect(valor).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(metodo).toBeInTheDocument();
    expect(categoria).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(addDespesaButton).toBeInTheDocument();
  });

  test('Verifica se todas as currencies estão dentro das opções do selectbox', () => {
    const currencies = Object.keys(mockData).filter((e) => e !== 'USDT');
    const initialState = {
      currencies,
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const moeda = screen.getByRole('combobox', { name: /moeda/i });

    userEvent.selectOptions(moeda, 'USD');
    // userEvent.selectOptions(moeda, currencies);
    // expect(moeda).toHaveValue('CAD');
  });
});
