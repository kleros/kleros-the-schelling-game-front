const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

const questionApi = {
  getQuestion (signMsg) {
    return fetch(`${process.env[`REACT_APP_${env}_API`]}/questions/${signMsg}`)
      .then(statusHelper)
      .then(response => response.json())
      .catch(err => err)
      .then(data => data)
  },
  getQuestions (password) {
    return fetch(`${process.env[`REACT_APP_${env}_API`]}/questions?password=${password}`)
      .then(statusHelper)
      .then(response => response.json())
      .catch(err => err)
      .then(data => data)
  },
  getCountQuestions () {
    return fetch(`${process.env[`REACT_APP_${env}_API`]}/questions/count`)
      .then(statusHelper)
      .then(response => response.json())
      .catch(err => err)
      .then(data => data)
  },
  putQuestion (questionId, valid, password) {
    return fetch(`${process.env[`REACT_APP_${env}_API`]}/admin?password=${password}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        questionId,
        valid,
        password
      })
    })
      .then(statusHelper)
      .then(response => response.json())
      .catch(err => err)
      .then(data => data)
  },
  postQuestion (question) {
    return fetch(`${process.env[`REACT_APP_${env}_API`]}/questions`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: question.question,
        address: question.address,
        proposals: question[0] + ',' + question[1] + ',' + question[2] + ',' + question[3],
        username: question.telegram
      })
    })
      .then(statusHelper)
      .then(response => response.json())
      .catch(err => err)
      .then(data => data)
  }
}

/**
 * Checkes status.
 * @param {object} response - The http response.
 * @returns {object} - The response.
 */
function statusHelper (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export default questionApi
