import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Checa a página Carteira', () => {
  test('Verifica se o form está renderizando corretamente', () => {
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

  test('Checa o click de Adicionar Despesa', async () => {
    const initialState = {
      user: {
        email: '',
      },
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [],
        editExpense: {},
        isEditing: 0,
      },
    };

    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const valor = screen.getByTestId('value-input');
    const moeda = screen.getByLabelText(/moeda/i);
    const metodo = screen.getByLabelText(/método/i);
    const categoria = screen.getByLabelText(/categoria/i);
    const desc = screen.getByLabelText(/descrição/i);
    const addDespesaButton = screen.getByRole('button', { name: /adicionar/i });

    const VALOR = '1';
    const MOEDA = 'USD';
    const METODO = 'Dinheiro';
    const CATEGORIA = 'Alimentação';
    const DESC = '1 dólar americano';

    userEvent.type(valor, VALOR);
    userEvent.selectOptions(moeda, MOEDA);
    userEvent.selectOptions(metodo, METODO);
    userEvent.selectOptions(categoria, CATEGORIA);
    userEvent.type(desc, DESC);

    expect(valor).toHaveValue(Number(VALOR));
    expect(moeda).toHaveValue(MOEDA);
    expect(metodo).toHaveValue(METODO);
    expect(categoria).toHaveValue(CATEGORIA);
    expect(desc).toHaveValue(DESC);
    expect(addDespesaButton).toBeInTheDocument();

    userEvent.click(addDespesaButton);

    expect(global.fetch).toBeCalledTimes(2);

    const { wallet } = store.getState();
    console.log(wallet);

    // expect(expenses[0].id).toBe(0);
    // expect(expenses[0].value).toBe(VALOR);
    // expect(expenses[0].currency).toBe(MOEDA);
    // expect(expenses[0].method).toBe(METODO);
    // expect(expenses[0].tag).toBe(CATEGORIA);
    // expect(expenses[0].description).toBe(DESC);
  });
});
