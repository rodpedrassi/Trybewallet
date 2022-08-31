import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
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
            {expenses.map((expense) => {
              const { id, description, tag, method, currency, exchangeRates } = expense;
              const value = parseFloat(expense.value).toFixed(2);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>
                    {(
                      parseFloat(exchangeRates[currency].ask) * parseFloat(value)
                    ).toFixed(2)}
                  </td>
                  <td>Real</td>
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

export default connect(mapStateToProps)(Table);