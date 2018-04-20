const questionApi = {
  getQuestion() {
    return fetch(`https://gamedrop.io/questions`)
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
