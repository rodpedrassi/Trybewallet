import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testando comportamento de Table', () => {
  test('Checa se os titulos da tabela foram rederizados corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const headersTitle = screen.getAllByRole('columnheader');
    expect(headersTitle).toHaveLength(9);
  });
  test('Checa se existem 2 botões na tabela, e se todos os campos foram preenchidos', () => {
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [
          {
            id: 0,
            value: '10',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: '10 dolares',
            exchangeRates: mockData,
          },
          {
            id: 1,
            value: '20',
            currency: 'CAD',
            method: 'Cartão de crédito',
            tag: 'Lazer',
            description: '20 dolares canadenses',
            exchangeRates: mockData,
          },
        ],
        editExpense: {},
        isEditing: false,
      },
    };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const { wallet: { expenses } } = store.getState();

    expenses.forEach((expense) => {
      const desc = screen.getByRole('cell', { name: expense.description });
      const tag = screen.getByRole('cell', { name: expense.tag });
      const method = screen.getByRole('cell', { name: expense.method });
      const value = screen.getByRole('cell', { name: Number(expense.value).toFixed(2) });
      const coin = screen.getByRole('cell', { name: expense.exchangeRates[expense.currency].name });
      const exchange = screen.getByRole('cell', { name: Number(expense.exchangeRates[expense.currency].ask).toFixed(2) });
      const CONVERTED_VALUE = Number(expense.value
        * expense.exchangeRates[expense.currency].ask);
      const convertedValue = screen.getByRole('cell', { name: CONVERTED_VALUE.toFixed(2) });
      const conversionCoin = screen.getAllByRole('cell', { name: 'Real' });
      const editButtons = screen.getAllByRole('button', { name: /editar/i });
      const removeButtons = screen.getAllByRole('button', { name: /excluir/i });
      expect(desc).toBeInTheDocument();
      expect(tag).toBeInTheDocument();
      expect(method).toBeInTheDocument();
      expect(value).toBeInTheDocument();
      expect(coin).toBeInTheDocument();
      expect(exchange).toBeInTheDocument();
      expect(convertedValue).toBeInTheDocument();
      expect(conversionCoin).toHaveLength(2);
      expect(editButtons).toHaveLength(2);
      expect(removeButtons).toHaveLength(2);
    });
  });
});
