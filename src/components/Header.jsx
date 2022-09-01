import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/izi.css';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  handleTotal = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, curr) => (
      acc + curr.value * curr.exchangeRates[curr.currency].ask
    ), 0);
  };

  render() {
    const { email } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <header className="header-box">
          <div>
            <p data-testid="email-field">{`Usuário: ${email}`}</p>
          </div>
          <div>
            <span>Total: </span>
            <span data-testid="total-field">{ this.handleTotal().toFixed(2)}</span>
            <span data-testid="header-currency-field">{currency}</span>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
