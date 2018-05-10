import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import * as profileActions from '../../actions/profile'

import './home.css'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

class Home extends PureComponent {
  state = {
    isStart: false
  }

  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  handleUserInfo = profile => {
    this.props.createProfile(profile)
  }

  handleStart = () => this.setState({isStart: true})

  render() {
    const { isStart } = this.state
    const { profile } = this.props

   if (isStart) {
     return <Redirect to="/game" />
   }

    return (
      <div className="Home">
        <div>
          <h1 style={{ margin: 0 }}>Schelling Game</h1>
        </div>
        <div className="start">
          <button onClick={this.handleUserInfo}>Start</button>
        </div>
        <div>
          <footer>
            © WTFPL - 2018 - <Link to='/submit-question'>Submit a question</Link> | <Link to='/dashboard'>Dashboard</Link>
          </footer>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {
    createProfile: profileActions.createProfile
  }
)(Home)
