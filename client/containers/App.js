import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import UserActions from '../actions/UserActions'

import '../styles/App.styl'

class App extends Component {
  constructor(props) {
    super(props);
    this.props.userActions.restoreSession();
  }
  logOut = () => {
    this.props.userActions.logOut();
  }
  render() {
    const { currentName, isLogged } = this.props.user;

    return (
      <div>
        <div className='header-background'>
          <div className='header-container'>
            <Link to='/' className='header-logo'>Messages</Link>
            <div>
              <p className='header-status'>You are logged in as
                <span> {currentName}</span>
              </p>
              {
                (this.props.location.pathname == '/') ?
                <div>
                {
                  isLogged ?
                  <div className='header-login-button' onClick={this.logOut}>Log Out</div>
                  :
                  <Link to='enter' className='header-login-button'>Log In</Link>
                }
                </div>
                :
                null
              }
            </div>
          </div>
        </div>
        <div className='page-container'>
          {this.props.children}
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
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
