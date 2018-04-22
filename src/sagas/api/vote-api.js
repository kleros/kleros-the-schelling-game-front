const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

const questionApi = {
  postVote(hash, questionId, voteId) {
    return fetch(
      `${
        process.env[`REACT_APP_${env}_API`]
      }/questions/${questionId}/votes/${voteId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hash,
          questionId,
          voteId
        })
      }
    )
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
function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export default questionApi
