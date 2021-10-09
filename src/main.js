require('dotenv').config();

const { getSubscribers } = require('./lib/revue');
const { addSubscriberByFormId } = require('./lib/convertkit');
const { wait } = require('./lib/util');
const { sendMail } = require('./lib/mail');

async function run() {
  try {
    // Get all subscribers from Revue

    console.log('Getting all subscribers from Revue...');

    const subscribers = await getSubscribers();

    // Loop through each and add them as a subscriber to convertkit

    console.log('Adding subscribers to Convertkit...');

    for ( const subscriber of subscribers ) {
      await addSubscriberByFormId(subscriber, process.env.CONVERTKIT_FORM_ID, {
        tags: process.env.CONVERTKIT_TAGS && process.env.CONVERTKIT_TAGS.split(','),
        fields: ['email', 'first_name']
      });

      // To avoid spamming the endpoint, pause for .5s

      await wait(500);
    }

    console.log('Successfully synced all subscribers');
  } catch(e) {
    console.error(`Failed to sync subscribers: ${e.message}`);

    if ( process.env.SENDGRID_API_KEY ) {
      await sendMail({
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
        subject: 'Failed to sync subscribers!',
        message: e.message
      });
    }
  }

  console.log('Done!');
}

run();