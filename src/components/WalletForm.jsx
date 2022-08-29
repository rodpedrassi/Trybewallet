import React, { Component } from 'react';
import '../css/izi.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../services/api';
import { optionCurrencies as optionCurrenciesAction } from '../redux/actions/index';

class WalletForm extends Component {
  async componentDidMount() {
    await this.getCurrencies();
  }

  getCurrencies = async () => {
    const data = await fetchCurrency();
    const arrayCurrencies = Object.keys(data);
    const { dispatch } = this.props;
    const newCurrencies = arrayCurrencies.filter((e) => e !== 'USDT');
    const wallet = {
      currencies: newCurrencies,
    };

    dispatch(optionCurrenciesAction(wallet));
  };

  render() {
    const { wallet: { currencies } } = this.props;
    console.log('dentro do render', currencies);
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
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
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
            />
          </label>

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
