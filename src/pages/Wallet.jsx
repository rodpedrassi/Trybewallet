import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
// import fetchCurrency from '../services/api';
// import { optionCurrencies as optionCurrenciesAction } from '../redux/actions/index';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default connect()(Wallet);
