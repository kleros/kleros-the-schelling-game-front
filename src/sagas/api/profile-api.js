const profileApi = {
  postProfile (profile) {
    return fetch(`https://gamedrop.io/profiles`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: profile.id,
        username: profile.username,
        hash: profile.hash,
        auth_date: profile.auth_date,
        photo_url: profile.photo_url,
        first_name: profile.first_name,
        last_name: profile.last_name
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
function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export default profileApi
