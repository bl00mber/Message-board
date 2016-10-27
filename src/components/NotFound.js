import React, { Component } from 'react'
import { Link } from 'react-router'

import '../styles/NotFound.styl'

export default class NotFound extends Component {
  render() {
    return (
      <div className='not-found'>
        <p>
          Page not found. <Link to='/'>Back</Link>?
        </p>
      </div>
    )
  }
}
