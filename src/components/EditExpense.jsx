import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense as editExpenseAction } from '../redux/actions';

class EditExpense extends Component {
  state = {
    id: 0,
    value: '',
    totalExpense: 0,
    currency: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
    editedValue: '0',
  };

  componentDidMount() {
    const { expenseToEdit } = this.props;
    const {
      id, value, totalExpense, currency, method, tag, description, exchangeRates,
    } = expenseToEdit;
    this.setState({
      id,
      value,
      totalExpense,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const editedValue = this.handleDiferencyActualPrevValue();
    this.setState({ editedValue }, () => {
      dispatch(editExpenseAction(this.state));
    });
  };

  handleDiferencyActualPrevValue = () => {
    const actual = this.actualValueConversion();
    const prev = this.prevValueConversion();
    return actual - prev;
  };

  actualValueConversion = () => {
    const { value, currency, exchangeRates } = this.state;
    const total = parseFloat(value) * parseFloat(exchangeRates[currency].ask);
    return total;
  };

  prevValueConversion = () => {
    const { expenseToEdit: { value, currency, exchangeRates } } = this.props;
    const total = parseFloat(value) * parseFloat(exchangeRates[currency].ask);
    return total;
  };

  render() {
    const { value, description, currency, exchangeRates, tag, method } = this.state;
    const currencies = Object.keys(exchangeRates).filter((e) => e !== 'USDT');

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
              {currencies && currencies.map((curr) => (
                <option
                  key={ curr }
                  value={ curr }
                  selected={ curr === currency }
                >
                  {curr}
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
              value={ method }
              onChange={ (e) => this.handleChange(e) }
            >
              <option selected value="Dinheiro">Dinheiro</option>
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
              value={ tag }
              onChange={ (e) => this.handleChange(e) }
            >
              <option selected value="Alimentação">Alimentação</option>
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
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="edit-btn"
          >
            Editar Despesa
          </button>
        </form>
      </div>
    );
  }
}
EditExpense.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.shape().isRequired,
};
const mapStateToProps = (state) => ({
  expenseToEdit: state.wallet.editExpense,
});

export default connect(mapStateToProps)(EditExpense);
