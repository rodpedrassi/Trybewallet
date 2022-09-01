import React, { Component } from 'react';
import '../css/izi.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../services/api';
import {
  optionCurrencies as optionCurrenciesAction,
  saveExpenses as saveExpensesAction,
  saveTotalExpenses as saveTotalExpensesAction,
} from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    totalExpense: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  };

  async componentDidMount() {
    await this.getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      // this.handleButtonDisabled();
    });
  };

  handleClick = async () => {
    await this.handleTotal();
    const { wallet: { expenses } } = this.props;
    this.setState({ id: expenses.length }, () => {
      this.dispatchSaveExpenses();
    });
    this.setState(() => ({
      value: '',
      description: '',
    }));
  };

  handleTotal = async () => {
    const actualCurrency = await fetchCurrency();
    this.setState(({ exchangeRates: actualCurrency }));
    // Faz a conversão e adiciona pro total
    const { value, currency, exchangeRates } = this.state;
    const total = parseFloat(value) * parseFloat(exchangeRates[currency].ask);
    this.setState((prev) => ({
      totalExpense: (parseFloat(prev.totalExpense) + total).toFixed(2),
    }));
    const { totalExpense } = this.state;
    const { dispatch } = this.props;
    dispatch(saveTotalExpensesAction(totalExpense));
  };

  getCurrencies = async () => {
    const data = await fetchCurrency();
    const arrayCurrencies = Object.keys(data);
    const { dispatch } = this.props;
    const newCurrencies = arrayCurrencies.filter((e) => e !== 'USDT');
    dispatch(optionCurrenciesAction(newCurrencies));
  };

  dispatchSaveExpenses = () => {
    const { dispatch } = this.props;
    const { id, value, currency, method, tag, description, exchangeRates } = this.state;
    const stateWithoutTotal = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    dispatch(saveExpensesAction(stateWithoutTotal));
  };

  render() {
    const { wallet: { currencies } } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <form className="form-group">
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ (e) => this.handleChange(e) }
            >
              {currencies && currencies.map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                >
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ (e) => this.handleChange(e) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ (e) => this.handleChange(e) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}
WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape().isRequired,
};
const mapStateToProps = (state) => ({
  wallet: state.wallet,
});
export default connect(mapStateToProps)(WalletForm);
