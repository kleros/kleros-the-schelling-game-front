import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import * as profileActions from '../../actions/profile'
import * as questionActions from '../../actions/question'
import * as voteActions from '../../actions/vote'

import './question.css'

class Question extends PureComponent {
  state = {
    success: null
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

  handleVote = e => {
    const { profile, question, createVote } = this.props
    console.log(question.data._id, profile.data.hash)

    createVote(profile.data.hash, question.data._id, e.target.value)
  }

  static propTypes = {}

  render() {
    const { start } = this.state
    const { question, profile, vote } = this.props

    if (start) {
      return <Redirect to="/game" />
    }

    if (!profile.data) {
      return <Redirect to="/" />
    }

    if (vote.data && vote.data.result === 'loose') {
      return <Redirect to="/scores" />
    }

    return (
      <div className="">
        <RenderIf
          resource={question}
          loading="Loading question..."
          done={
            question.data && question.data.question ? (
              <div>
                <h1>{question.data.question}</h1>
                {question.data.proposals.map((p, index) => (
                  <button value={index} key={index} onClick={this.handleVote}>
                    {p}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                Kudos! You have answered all the questions correctly.
                <Link to='/scores'>See scores</Link>
              </div>
            )
          }
          failedLoading={<span />}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile,
    question: state.question.question,
    vote: state.vote.vote
  }),
  {
    fetchQuestion: questionActions.fetchQuestion,
    createVote: voteActions.createVote
  }
)(Question)
