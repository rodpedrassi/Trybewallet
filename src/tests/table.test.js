import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  test('Checa se ao clickar no botão Excluir, remove a expense da tabela', () => {
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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const removeButtons = screen.getAllByRole('button', { name: /excluir/i });

    expect(removeButtons).toHaveLength(2);
    userEvent.click(removeButtons[0]);
    userEvent.click(removeButtons[1]);
    expect(screen.queryByText(/canadenses/i, { selector: 'td' })).not.toBeInTheDocument();
    expect(screen.queryByText(/10 dolares/i, { selector: 'td' })).not.toBeInTheDocument();
  });

  test('Checa se ao clickar no botão de editar, o botão salvar editar despesa aparece', () => {
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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    expect(screen.queryByText(/editar despesa/i, { selector: 'button' })).not.toBeInTheDocument();
    userEvent.click(editButtons[0]);
    expect(screen.queryByText(/editar despesa/i, { selector: 'button' })).toBeInTheDocument();
  });

  test('Checa se ao clickar no botão de editar, as informações corretas aparecem no forms', () => {
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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(editButtons[0]);

    const valor = screen.getByTestId('value-input');
    const moeda = screen.getByLabelText(/moeda/i);
    const metodo = screen.getByLabelText(/método/i);
    const categoria = screen.getByLabelText(/categoria/i);
    const desc = screen.getByLabelText(/descrição/i);

    expect(valor).toHaveValue(10);
    expect(moeda).toHaveValue('USD');
    expect(metodo).toHaveValue('Dinheiro');
    expect(categoria).toHaveValue('Alimentação');
    expect(desc).toHaveValue('10 dolares');
  });
  test('Checa se editar despesa funciona corretamenta', () => {
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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(editButtons[0]);

    const valor = screen.getByTestId('value-input');
    const moeda = screen.getByLabelText(/moeda/i);
    const metodo = screen.getByLabelText(/método/i);
    const categoria = screen.getByLabelText(/categoria/i);
    const desc = screen.getByLabelText(/descrição/i);
    const editExpense = screen.getByRole('button', { name: /editar despesa/i });

    userEvent.type(valor, '100');
    userEvent.selectOptions(moeda, 'EUR');
    userEvent.selectOptions(metodo, 'Cartão de crédito');
    userEvent.selectOptions(categoria, 'Saúde');
    userEvent.type(desc, '100 euros');

    userEvent.click(editExpense);
  });
});
