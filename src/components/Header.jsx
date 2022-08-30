import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/izi.css';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  render() {
    const { email, totalExpense } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <header className="header-box">
          <div>
            <p data-testid="email-field">{`Usuário: ${email}`}</p>
          </div>
          <div>
            <span>Total: </span>
            <span data-testid="total-field">{`${totalExpense}`}</span>
            <span data-testid="header-currency-field">{currency}</span>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.totalExpense,
});

export default connect(mapStateToProps)(Header);
