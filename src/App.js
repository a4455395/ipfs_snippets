import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './services/history'
import HomePage from './components/Home'
import ErrorPage from './components/ErrorPage'

export default function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/error" component={ErrorPage} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </Router>
  )
}
