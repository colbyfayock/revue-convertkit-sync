const fetch = require('node-fetch');

/**
 * getSubscribers
 */

async function getSubscribers() {
  try {
    const response = await fetch('https://www.getrevue.co/api/v2/subscribers', {
      headers: {
        Authorization: `Token ${process.env.REVUE_API_KEY}`
      }
    });
    if ( `${response.status}`.substr(0, 1) !== '2' ) {
      throw new Error(response.statusText)
    }
    const subscribers = await response.json();
    return subscribers;
  } catch(e) {
    throw e;
  }
}

module.exports.getSubscribers = getSubscribers;