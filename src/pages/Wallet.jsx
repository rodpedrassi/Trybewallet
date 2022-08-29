import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
// import fetchCurrency from '../services/api';
// import { optionCurrencies as optionCurrenciesAction } from '../redux/actions/index';

class Wallet extends Component {
  // async componentDidMount() {
  //   await this.getCurrencies();
  // }

  // getCurrencies = async () => {
  //   const data = await fetchCurrency();
  //   const arrayCurrencies = Object.keys(data);
  //   const wallet = {
  //     currencies: arrayCurrencies,
  //   };
  //   const { dispatch } = this.props;
  //   dispatch(optionCurrenciesAction(wallet));
  //   // return arrayCurrencies;
  // };

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}
// Wallet.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default connect()(Wallet);
