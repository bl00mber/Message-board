import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'

import '../styles/LoginPage.styl'

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const inputStyle = { marginLeft: 20 };
const buttonStyle = { margin: 12 };

const validRegexp = /^[a-zA-Z0-9_]+$/;

class Content extends Component {
  constructor() {
    super()
    this.state = { errorUserText: '', errorPassText: '' }
  }
  _handleTextFieldsChange(e) {
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
  _buttonsHandler(isSignUp) {
    let username = this.refs.username.input.value,
        password = this.refs.password.input.value;

    console.log(this.refs)

    if (username == '') {
      return this.setState({ errorUserText: 'Please enter username', buttonsDisabled: true });
    } else if (password == '') {
      return this.setState({ errorPassText: 'Please enter password', buttonsDisabled: true });
    }

    isSignUp ?
    this.props.userActions.createUser(username, password) :
    this.props.userActions.logIn(username, password)
  }
  onlogInBtnClick() {
    this._buttonsHandler(false)
  }
  onSignUpBtnClick() {
    this._buttonsHandler(true)
  }
  render() {
    return (
      <div className='login-page'>
        <div className='login-form'>
          <div className='login-form-header'>Login/Sign Up</div>

          <Paper zDepth={2}>
            <TextField hintText='Username' style={inputStyle} errorText={this.state.errorUserText}
             ref='username' underlineShow={false} onInput={::this._handleTextFieldsChange} />
            <Divider />
            <TextField hintText='Password' style={inputStyle} errorText={this.state.errorPassText}
             ref='password' underlineShow={false} onInput={::this._handleTextFieldsChange} />
            <Divider />
          </Paper>

          <div className='login-buttons'>
            <RaisedButton label='Log in' className='login' primary={true} style={buttonStyle}
             onClick={::this.onlogInBtnClick} disabled={this.state.buttonsDisabled} />
           <RaisedButton label='Sign up'  secondary={true} style={buttonStyle}
             onClick={::this.onSignUpBtnClick} disabled={this.state.buttonsDisabled} />
          </div>

        </div>
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
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
