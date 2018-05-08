import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Words, Heading, Button, Footer, Header } from 'arwes'

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
    localStorage.setItem('storageProfileSchellingGame', JSON.stringify(profile))
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
        <Header animate>
          <h1 style={{ margin: 0 }}>Schelling Game</h1>
        </Header>
        <div className="Home-logIn">
          {
           !(JSON.parse(localStorage.getItem('storageProfileSchellingGame'))) ? (
              <TelegramLoginButton
                dataOnauth={this.handleUserInfo}
                botName={process.env[`REACT_APP_${env}_TELEGRAM_BOT`]}
              />
            ) : (
              <Button animate show onClick={this.handleStart}>Start</Button>
            )
          }
          <div className="Home-logIn-submitQuestion">
            <Link to='/submit-question'><Words animate layer='success'>Submit a question</Words></Link>
          </div>
          <Footer animate>
            <Link to='/dashboard'>Dashboard</Link>
          </Footer>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile
  }),
  {
    createProfile: profileActions.createProfile
  }
)(Home)
