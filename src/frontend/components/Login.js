import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmail, isLength } from 'validator';
import GitHubLogin from 'react-github-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import sessionLogin, { handleGitHubLogin } from '../../utils/sessionLogin';
import '../styles/styles.scss';
import { VALID_TOKEN } from '../../constants';

const INVALID_EMAIL = 'Please enter a valid email address.';
const PASSWORD_LENGTH = 'Password should be at least 6 characters.';
const INVALID_LOGIN = 'Invalid email or password! Please try again.';
const INVALID_GITHUB_LOGIN = 'Login error with GitHub. Please try again.';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: '',
      loginError: false,
    };

    this.emailChange = this.emailChange.bind(this);
    this.getDisabledStatus = this.getDisabledStatus.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  onSuccess(response) {
    const { login } = this.props;
    handleGitHubLogin(response).then((req) => {
      const { email, token: authToken } = req.data;
      login({ email, authToken });
    });
  }

  onFailure() {
    this.setState({ status: INVALID_GITHUB_LOGIN, loginError: true });
  }

  getDisabledStatus() {
    const { email, password } = this.state;
    return !(isEmail(email) && isLength(password, { min: 6 }));
  }

  async handleAuth(e) {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const { login } = this.props;
      const user = await sessionLogin(email, password);
      const { authToken } = user;
      if (authToken === VALID_TOKEN) {
        this.setState({ status: `Login token is ${authToken}`, loginError: false });
        login(user);
      } else {
        this.setState({ status: INVALID_LOGIN, loginError: true });
      }
    } catch (err) {
      this.setState({ status: err.message });
    }
  }

  validateEmail() {
    const { email } = this.state;
    if (!isEmail(email)) {
      this.setState({ status: INVALID_EMAIL, loginError: true });
    }
  }

  validatePassword() {
    const { password } = this.state;
    if (password) {
      if (!isLength(password, { min: 6 })) {
        this.setState({ status: PASSWORD_LENGTH, loginError: true });
      }
    }
  }

  emailChange(event) {
    const { email } = this.state;
    const { value } = event.target;
    this.setState({ email: value });
    if (isEmail(email)) {
      this.setState({ status: '' });
    }
  }

  passwordChange(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }

  render() {
    const {
      email, password, status, loginError,
    } = this.state;

    return (
      <div>
        <main className="pa4 black-80 measure center">
          <form onSubmit={this.handleAuth}>
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="mooveItTeal f4 fw6 ph0 mh0">Sign In</legend>
              {loginError && <p className="mooveItNavy">{status}</p>}
              <div className="mt3">
                <label className="mooveItTeal db fw6 lh-copy f6" htmlFor="email">
                  Email
                  <input
                    className="pa2 outline-0 mooveItTealBorder input-reset ba bg-transparent w-100"
                    value={email}
                    onChange={this.emailChange}
                    onBlur={this.validateEmail}
                    type="text"
                    name="email"
                    autoComplete="off"
                  />
                </label>
              </div>
              <div className="mv3">
                <label className="mooveItTeal db fw6 lh-copy f6" htmlFor="password">
                  Password
                  <input
                    className="pa2 outline-0 mooveItTealBorder input-reset ba bg-transparent w-100"
                    value={password}
                    onChange={this.passwordChange}
                    onBlur={this.validatePassword}
                    type="password"
                    name="password"
                    autoComplete="off"
                    title="Minimum 6 characters"
                  />
                </label>
              </div>
            </fieldset>
            <div>
              <input
                className={`f6 ph3 pv2 outline-0 input-reset dib bg-transparent ba b--moon-gray bg-white moon-gray ${!this.getDisabledStatus() &&
                  'mooveItNavybg mooveItTeal grow pointer'}`}
                type="submit"
                value="Sign in"
                disabled={this.getDisabledStatus()}
              />
            </div>
          </form>
          <GitHubLogin
            clientId={process.env.GITHUB_CLIENT_ID}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            redirectUri=""
            className="f6 ph3 pv2 mv1 outline-0 input-reset dib bg-transparent ba b--moon-gray bg-white mooveItNavybg mooveItTeal grow pointer"
          >
            <FontAwesomeIcon icon={faGithub} className="pr1" size="lg" /> Sign In with GitHub
          </GitHubLogin>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
