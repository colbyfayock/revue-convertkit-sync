require('dotenv').config();

const { getSubscribers: getRevueSubscribers } = require('./lib/revue');
const { addSubscriberByFormId, getSubscribers: getConvertkitSubscribers } = require('./lib/convertkit');
const { wait } = require('./lib/util');
const { sendMail } = require('./lib/mail');

const MILLISECONDS_1_DAY = 1000 * 60 * 60 * 24

async function run() {
  try {
    // Get all subscribers from Revue

    console.log('Getting all subscribers from Revue...');

    const subscribers = await getRevueSubscribers();

    if ( process.env.DEBUG_MODE === 'true' ) {
      console.log('<<<< Begin subscribers');
      console.log(subscribers);
      console.log('>>>> End subscribers');
    }

    console.log(`Found ${subscribers.length} active subscribers.`);

    const timestampNow = Date.now();
    const timestampYesterday = timestampNow - MILLISECONDS_1_DAY;

    const newSubscribers = subscribers.filter(({ last_changed }) => new Date(last_changed).getTime() - timestampYesterday > 0);

    console.log(`Found ${newSubscribers.length} subscribers since ${new Date().toDateString(timestampYesterday)}`);

    if ( process.env.DEBUG_MODE === 'true' ) {
      console.log('<<<< Begin newSubscribers');
      console.log(newSubscribers);
      console.log('>>>> End newSubscribers');
    }

    // Loop through each and add them as a subscriber to convertkit

    console.log('Adding subscribers to Convertkit...');

    for ( const subscriber of newSubscribers ) {
      console.log(`> Adding subscriber: ${subscriber.email}`);

      if ( process.env.DEBUG_MODE === 'true' ) {
        console.log('>> Debug mode - not adding subscriber');
        await addSubscriberByFormId(subscriber, process.env.CONVERTKIT_FORM_ID, {
          tags: process.env.CONVERTKIT_TAGS && process.env.CONVERTKIT_TAGS.split(','),
          fields: ['email', 'first_name']
        });
      }

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