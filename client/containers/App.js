import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import '../styles/App.styl'

class App extends Component {
  render() {
    const { currentName, isLogged } = this.props.user;

    return (
      <div>
        <div className='header-background'>
          <div className='header-container'>
            <Link to='/' className='header-logo'>Notes list</Link>
            <div>
              <p className='header-status'>You are logged in as
                <span> {currentName}</span>
              </p>
              {
                (this.props.location.pathname == '/') ?
                <div>
                {
                  isLogged ?
                  <div className='header-login-button'>{currentName}Log Out</div>
                  :
                  <Link to='login' className='header-login-button'>Log In</Link>
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

export default connect(mapStateToProps)(App)
