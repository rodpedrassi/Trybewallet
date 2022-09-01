import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  deleteExpense as deleteExpenseAction,
  sendExpenseToEdit as sendExpenseToEditAction,
} from '../redux/actions/index';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, sendExpenseToEdit } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses && expenses.map((expense) => {
              const { id, description, tag, method, currency, exchangeRates } = expense;
              const value = parseFloat(expense.value).toFixed(2);
              const convertedValue = (
                parseFloat(exchangeRates[currency].ask) * parseFloat(value)
              ).toFixed(2);
              return (
                <tr key={ id }>
                  <td>{id}</td>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{convertedValue}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => sendExpenseToEdit(expense) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExpense({ id, convertedValue }) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
Table.propTypes = {
  deleteExpense: propTypes.func.isRequired,
  sendExpenseToEdit: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
      description: propTypes.string,
      currency: propTypes.string,
      method: propTypes.string,
      tag: propTypes.string,
      exchangeRates: propTypes.objectOf(
        propTypes.shape({
          name: propTypes.string,
          ask: propTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch(deleteExpenseAction(value)),
  sendExpenseToEdit: (value) => dispatch(sendExpenseToEditAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
