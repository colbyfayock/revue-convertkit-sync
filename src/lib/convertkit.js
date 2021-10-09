const fetch = require('node-fetch');

/**
 * addSubscriberByFormId
 */

async function addSubscriberByFormId(subscriber, formId, { tags, fields = ['email'] } = {}) {
  const params = {
    api_key: process.env.CONVERTKIT_API_KEY
  };

  if ( Array.isArray(tags) && tags.length > 0 ) {
    params.tags = tags;
  }

  // Only sync the fields that are configured to be to avoid extra data being sent over

  if ( Array.isArray(fields) ) {
    fields.forEach(param => {
      if ( subscriber[param] ) {
        params[param] = subscriber[param];
      }
    });
  }

  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(params)
  });

  const convertkit = await response.json();

  return convertkit;
}

module.exports.addSubscriberByFormId = addSubscriberByFormId;

