import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserActions from '../actions/UserActions'

import '../styles/EnterPage.styl'

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const inputStyle = { marginLeft: 20 };
const buttonStyle = { margin: 12 };

const validRegexp = /^[a-zA-Z0-9_]+$/;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { errorUserText: '', errorPassText: '' };
  }
  componentDidUpdate() {
    if (this.props.user.error) {
      this.refs.tooltip.style.opacity = 0.8;

      setTimeout(() => {
        this.refs.tooltip.style.opacity = 0;
        this.props.user.error = '';
      }, 5000);
    }
  }
  handleTextFieldsChange = (e) => {
    let target = e.target.parentNode.innerText.slice(0, 8),
        value = e.target.value,
        isValueValid = value.match(validRegexp);

    switch (target) {
      case 'Username':
        if (value == '') {
          this.setState({ errorUserText: 'Please enter username' });
        }

        if (isValueValid !== null) {
          this.setState({ errorUserText: '' });

          this.state.errorPassText == '' ? this.setState({ buttonsDisabled: false }) : null;
        } else {
          this.setState({ errorUserText: 'Allowed only numbers and letters', buttonsDisabled: true });
        }
      return

      case 'Password':
        if (value == '') {
          this.setState({ errorPassText: 'Please enter password' });
        }

        if (isValueValid !== null) {
          this.setState({ errorPassText: '' });

          this.state.errorUserText == '' ? this.setState({ buttonsDisabled: false }) : null;
        } else {
          this.setState({ errorPassText: 'Allowed only numbers and letters', buttonsDisabled: true });
        }
    }
  }
  _buttonsHandler = (isSignUp) => {
    let username = this.refs.username.input.value,
        password = this.refs.password.input.value,
        data = { username, password };

    if (username == '') {
      return this.setState({ errorUserText: 'Please enter username', buttonsDisabled: true });
    } else if (password == '') {
      return this.setState({ errorPassText: 'Please enter password', buttonsDisabled: true });
    }

    isSignUp ?
    this.props.userActions.signUp(data) :
    this.props.userActions.logIn(data)
  }
  onlogInBtnClick = () => {
    this._buttonsHandler(false)
  }
  onSignUpBtnClick = () => {
    this._buttonsHandler(true)
  }
  render() {
    return (
      <div className='login-page'>
        <form className='login-form'>
          <div className='login-form-header'>Login/Sign Up</div>

          <Paper zDepth={2}>
            <TextField hintText='Username' style={inputStyle} errorText={this.state.errorUserText}
             ref='username' underlineShow={false} name='username' onInput={this.handleTextFieldsChange} />
            <Divider />
            <TextField hintText='Password' style={inputStyle} errorText={this.state.errorPassText}
             ref='password' underlineShow={false} name='password' onInput={this.handleTextFieldsChange} />
            <Divider />
          </Paper>

          <div className='add_text_tooltip' ref='tooltip'>Please enter another username or password !</div>

          <div className='login-buttons'>
            <RaisedButton label='Log in' className='login' primary={true} style={buttonStyle}
             onClick={this.onlogInBtnClick} disabled={this.state.buttonsDisabled} />
           <RaisedButton label='Sign up' secondary={true} style={buttonStyle}
             onClick={this.onSignUpBtnClick} disabled={this.state.buttonsDisabled} />
          </div>

        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
