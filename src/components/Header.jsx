import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/izi.css';

class Header extends Component {
  state = {
    total: 0,
    currency: 'BRL',
  };

  render() {
    const { email } = this.props;
    const { total, currency } = this.state;
    return (
      <div>
        <header className="header-box">
          <div>
            <p data-testid="email-field">{`Usuário: ${email}`}</p>
          </div>
          <div>
            <span data-testid="total-field">{`Total: ${total}`}</span>
            <span data-testid="header-currency-field">{currency}</span>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
