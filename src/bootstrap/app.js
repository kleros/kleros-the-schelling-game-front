import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import Home from '../containers/home'
import Question from '../containers/question'
import Dashboard from '../containers/dashboard'
import Scores from '../containers/scores'
import PageNotFound from '../components/page-not-found'

import GlobalComponents from './global-components'

import './app.css'

const App = ({ store, history, testElement }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="router-root">
        <Helmet>
          <title>Dapper</title>
        </Helmet>
        <div id="scroll-root">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/question" component={Question} />
            <Route exact path="/scores/:result?/:user?" component={Scores} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        {testElement}
        <Route exact path="*" component={GlobalComponents} />
      </div>
    </ConnectedRouter>
  </Provider>
)

App.propTypes = {
  // State
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,

  // Testing
  testElement: PropTypes.element
}

App.defaultProps = {
  // Testing
  testElement: null
}

export default App
