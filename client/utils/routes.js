import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Content from '../containers/Content'
import LoginPage from '../containers/LoginPage'
import NotFound from '../components/NotFound'

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Content}/>
      <Route path='/login' component={LoginPage}/>
    </Route>
    <Route path='*' component={NotFound}/>
  </div>
)
