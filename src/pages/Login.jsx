import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login as loginAction } from '../redux/actions/index';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  checkEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  checkPassword = () => {
    const { password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    return password.length >= MIN_PASSWORD_LENGTH;
  };

  handleButtonDisabled = () => {
    const checkEmailAndPassword = this.checkEmail() && this.checkPassword();
    this.setState({ isButtonDisabled: !checkEmailAndPassword });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleButtonDisabled();
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    dispatch(loginAction({ email, password }));
    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div className="login">
        <h3>Login</h3>
        <section className="login-inputs">
          <form onSubmit={ (e) => this.handleLogin(e) }>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ (e) => this.handleChange(e) }
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              onChange={ (e) => this.handleChange(e) }
            />
            <button
              type="submit"
              disabled={ isButtonDisabled }
            >
              Entrar
            </button>
          </form>
        </section>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Login);
