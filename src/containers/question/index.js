import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'
import { ClipLoader } from 'react-spinners'

import * as questionActions from '../../actions/question'
import * as voteActions from '../../actions/vote'

import './question.css'

const toastrOptions = {
  timeOut: 3000,
  showCloseButton: false
}

class Question extends PureComponent {
  state = {
    success: null,
    msg: true
  }

  static propTypes = {
    // Action Dispatchers
    fetchQuestion: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchQuestion, profile } = this.props
    fetchQuestion(profile.data.sign_msg)
  }

  handleVote = voteId => e => {
    const { question, profile, createVote } = this.props

    createVote(profile.data.sign_msg, question.data._id, voteId)
  }

  static propTypes = {}

  render() {
    const { msg, isLoose } = this.state
    const { question, vote, profile } = this.props

    if (!profile.data) {
      return <Redirect to="/" />
    }

    if (
      question.data &&
      question.data.msg &&
      question.data.msg === 'You made 10 sessions. Try tomorrow.'
    ) {
      toastr.warning(
        'You have already answered 10 questions. You have to wait at least 1 hour to play again.',
        toastrOptions
      )
      return <Redirect to={`/scores`} />
    }

    if (
      question.data &&
      ((question.data.msg && question.data.msg === 'no question') ||
        question.data.msg ===
          'You have answered all the questions. You can try tomorrow or add new question.')
    ) {
      toastr.success(
        'Kudos! You have answered all the questions!',
        toastrOptions
      )
      return <Redirect to={`/scores`} />
    }

    if (vote.data && vote.data.result === 'loose') {
      toastr.warning('You failed to find the Schelling Point.', toastrOptions)
      return <Redirect to={`/scores?msg=loose`} />
    }

    return (
      <div className="Question">
        <RenderIf
          resource={question}
          done={
            question.data && question.data.question ? (
              <div className="proposals">
                <div className="proposals-question">
                  {question.data.question}
                </div>
                {question.data.proposals.map((p, index) => (
                  <div key={index}>
                    <button
                      className="proposal"
                      onClick={this.handleVote(index)}
                    >
                      {p}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )
          }
          failedLoading={<span />}
          loading={
            <div className="loader">
              <ClipLoader color={'gray'} loading={true} />
            </div>
          }
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    question: state.question.question,
    vote: state.vote.vote,
    profile: state.profile.profile
  }),
  {
    fetchQuestion: questionActions.fetchQuestion,
    createVote: voteActions.createVote
  }
)(Question)
