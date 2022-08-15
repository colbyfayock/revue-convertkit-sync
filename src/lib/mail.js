const sgMail = require('@sendgrid/mail');

if ( process.env.SENDGRID_API_KEY ) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * sendMail
 */

async function sendMail({ to, from, subject, message }) {
  const errorBase = 'Failed to send mail';

  if ( typeof to !== 'string' ) {
    throw new Error(`${errorBase}: Invalid field to`)
  }

  if ( typeof from !== 'string' ) {
    throw new Error(`${errorBase}: Invalid field from`)
  }

  const msg = {
    to,
    from,
    subject,
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(`${errorBase}: ${error.message}`);
    throw error;
  }
}

module.exports.sendMail = sendMail;