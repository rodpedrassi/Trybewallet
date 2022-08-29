import React, { Component } from 'react';
import '../css/izi.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../services/api';
import {
  optionCurrencies as optionCurrenciesAction,
  saveExpenses as saveExpensesAction,
} from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
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

  getCurrencies = async () => {
    const data = await fetchCurrency();
    const arrayCurrencies = Object.keys(data);
    const { dispatch } = this.props;
    const newCurrencies = arrayCurrencies.filter((e) => e !== 'USDT');
    dispatch(optionCurrenciesAction(newCurrencies));
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const actualCurrency = await fetchCurrency();
    this.setState(({ exchangeRates: actualCurrency }));
    dispatch(saveExpensesAction(this.state));
    this.setState((prev) => ({ id: prev.id + 1 }));
  };

  render() {
    const { wallet: { currencies } } = this.props;
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
