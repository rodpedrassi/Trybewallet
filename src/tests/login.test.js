import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Checa a página Login', () => {
  test('Todos os componentes estão renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);

    const titleLogin = screen.getByRole('heading', { level: 3, name: /login/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /Entrar/i });

    expect(titleLogin).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('O botão inicia desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeDisabled();
  });

  test('O botão habilita ao passar informações válidas', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '123456');
    expect(button).toBeEnabled();
  });

  test('Se ao clickar com informações validas a um roteamento para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
