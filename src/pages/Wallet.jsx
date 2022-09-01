import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditExpense from '../components/EditExpense';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <Header />
        {isEditing ? <EditExpense /> : <WalletForm />}
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Wallet);
