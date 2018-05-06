import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'
import { ClipLoader } from 'react-spinners'

import * as profileActions from '../../actions/profile'
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
    if (profile.data) {
      fetchQuestion(profile.data.hash)
    }
  }

  handleVote = voteId => e => {
    const { profile, question, createVote } = this.props

    createVote(profile.data.hash, question.data._id, voteId)
  }

  static propTypes = {}

  render() {
    const { start, msg } = this.state
    const { question, profile, vote } = this.props

    if (start) {
      return <Redirect to="/game" />
    }

    if (!profile.data) {
      return <Redirect to="/" />
    }

    if (question.data && question.data.msg && question.data.msg === 'You made 10 sessions. Try tomorrow.') {
      toastr.warning('You made 10 sessions. Try tomorrow.', toastrOptions)
      return <Redirect to={`/scores`} />
    }

    if (question.data && (question.data.msg && question.data.msg === 'no question' || question.data.msg === 'You have answered all the questions. You can try tomorrow or add new question.')) {
      toastr.success("Kudos! You have answered all the questions!", toastrOptions)
      return <Redirect to={`/scores`} />
    }

    if (vote.data && vote.data.result === 'loose') {
      toastr.info('Lost. You are not in the Schelling Point', toastrOptions)
      return <Redirect to={`/scores?msg=loose&username=${profile.username}#target`} />
    }

    return (
      <div className="Question">
        <RenderIf
          resource={question}
          done={
            question.data && question.data.question ? (
              <div className="Question-content">
                <div className="Question-content-head">
                  <div>
                    <h1>{question.data.question}</h1>
                  </div>
                </div>
                <div className="Question-content-proposals">
                  {question.data.proposals.map((p, index) => (
                    <div
                      key={index}
                      onClick={this.handleVote(index)}
                      className="Question-content-proposals-proposal"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )
          }
          failedLoading={<span />}
          loading={
            <div className="loader">
              <ClipLoader color={'gray'} loading={1} />
            </div>
          }
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
