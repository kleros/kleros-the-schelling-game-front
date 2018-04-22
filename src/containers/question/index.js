import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'

import * as profileActions from '../../actions/profile'

import './question.css'

class Question extends PureComponent {
  state = {
    start: false
  }

  handleStart = () => this.setState({ start: true })

  static propTypes = {
  }

  render() {
    const { start } = this.state
    const { profile } = this.props

   if (start) {
     return <Redirect to='/game' />;
   }

    return (
      <div className="">
        Question
      </div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile
  }),
  {}
)(Question)
