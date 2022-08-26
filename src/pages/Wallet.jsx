import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  render() {
    console.log(this.props);
    const { email, password } = this.props;

    return (
      <div>
        <p>{`Usuario: ${email}`}</p>
        <p>{`Senha? ${password}`}</p>
      </div>
    );
  }
}
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

export default connect(mapStateToProps)(Wallet);
