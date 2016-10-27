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
    this.state = { username: '', password: '', errorUserText: '', errorPassText: '' }
  }
  _handleTextFieldsChange(e) {
    let value = e.target.value;
    let target = e.target.hintText;

    switch (target) {
      case 'Username':
        switch (value) {
          case '':
            return this.setState({ errorUserText: 'Enter text here' });

          case (!value.match(validRegexp)):
            return this.setState({ errorUserText: 'Allowed only numbers and letters', buttonsDisabled: true });

          case (value.match(validRegexp)):
            return this.setState({ username: e.target.value, errorUserText: '', buttonsDisabled: false })
        }
      return

      case 'Password':
        switch (value) {
          case '':
            return this.setState({ errorPassText: 'Enter text here' });

          case (!value.match(validRegexp)):
            return this.setState({ errorPassText: 'Allowed only numbers and letters', buttonsDisabled: true });

          case (value.match(validRegexp)):
            return this.setState({ password: e.target.value, errorPassText: '', buttonsDisabled: false })
        }
    }
  }
  _checkText() {
    let nickname = this.state.username,
        password = this.state.password;

    if (nickname && password) {
      return true
    } else {
      this.setState({ buttonsDisabled: true })
      return false
    }
  }
  onlogInBtnClick() {
    if (this._checkText()) {
      this.props.userActions.logIn(this.state.username, this.state.password);
    }
  }
  onSignUpBtnClick() {
    if (this._checkText()) {
      this.props.userActions.createUser(this.state.username, this.state.password);
    }
  }
  render() {
    return (
      <div className='login-page'>
        <div className='login-form'>
          <div className='login-form-header'>Login/Sign Up</div>

          <Paper zDepth={2}>
            <TextField hintText='Username' style={inputStyle}
             underlineShow={false} onChange={::this._handleTextFieldsChange} />
            <Divider />
            <TextField hintText='Password' style={inputStyle}
             underlineShow={false} onChange={::this._handleTextFieldsChange} />
            <Divider />
          </Paper>

          <div className='login-buttons'>
            <RaisedButton label='Log in' primary={true} style={buttonStyle}
             onClick={::this.onlogInBtnClick} />
            <RaisedButton label='Sign up' secondary={true} style={buttonStyle}
             onClick={::this.onSignUpBtnClick} />
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
