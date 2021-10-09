const fetch = require('node-fetch');

/**
 * getSubscribers
 */

async function getSubscribers() {
  const response = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`
    }
  });

  const subscribers = await response.json();

  return subscribers;
}

module.exports.getSubscribers = getSubscribers;