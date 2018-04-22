import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'

import * as profileActions from '../../actions/profile'
import * as questionActions from '../../actions/question'

import './question.css'

class Question extends PureComponent {
  state = {
    start: false
  }

  static propTypes = {
    // Action Dispatchers
    fetchQuestion: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchQuestion, profile } = this.props
    if (profile.data) {
      fetchQuestion(profile.data.hash)
    }
  }

  handleStart = () => this.setState({ start: true })

  static propTypes = {
  }

  render() {
    const { start } = this.state
    const { question, profile } = this.props

   if (start) {
     return <Redirect to='/game' />;
   }

   if (!profile.data) {
     return <Redirect to='/' />;
   }

    return (
      <div className="">
        <RenderIf
          resource={question}
          loading="Loading question..."
          done={
            question.data && (
              <div>
                <h1>{question.data.question}</h1>
                {question.data.proposals.map(
                  p => <button key={p}>{p}</button>
                )}
              </div>
            )
          }
          failedLoading={
            <span></span>
          }
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile,
    question: state.question.question
  }),
  {
    fetchQuestion: questionActions.fetchQuestion
  }
)(Question)
