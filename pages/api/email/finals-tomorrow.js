import { getAllRecords } from '@/lib/firebase-utils';
let nodemailer = require('nodemailer');

function capitalizeFirstLetter(word) {
  if (!word) return ''; // Handle empty input
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default async function handler(req, res) {
  const members = await getAllRecords('members');

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  for (let person of members) {
    if (
      person.emailAddress !== 'coreyj_11@hotmail.com' &&
      person.emailAddress !== 'orry.mevorach@gmail.com'
    )
      continue;
    try {
      const firstName = capitalizeFirstLetter(person.firstName);
      await transporter.sendMail({
        from: 'The Bracket Challenge noreply@thebracketchallenge.com',
        to: person.emailAddress,
        subject: `Finals Day Brackets Are Open And Updated Rankings Are Live`,
        html: `
              <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
                  <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
                      <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>
                      <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
                      <p style="font-size: 15px;font-weight:bold;">Finals Day Brackets Are Open</p>
                      <p style="font-size: 14px;">Revelstoke Qualifiers have wrapped up, and we dive straight into Finals Day tomorrow morrning.</p>
                      <p style="font-size: 14px;">Tomorrow's schedule:</p>
                      <ul>
                        <li style="font-size: 14px;">10:30AM PST: Brackets Close</li>
                        <li style="font-size: 14px;">11:00AM PST: Revelstoke Finals Day begin</li>
                      </ul>
                      <p style="font-size: 14px;">Make sure to <a href="https://thebracketchallenge.com/">log in</a> and fill out your bracket!</p>
                      <p style="font-size: 15px;font-weight:bold;">Updated Rankings Are Live</p>
                      <p style="font-size: 14px;">Scores after Revelstoke Qualifiers are live, check your brackets to see how they stack up against the competition!</p>
                      <p style="font-size: 15px;font-weight:bold;">Finals Day Action</p>
                      <p style="font-size: 14px;">Tune in tomorrow at 11:00AM on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-snowboard">Red Bull TV</a> to catch Finals Day!</p>
                  </div>
              </div>
          `,
      });
      console.log('Email sent to', person.emailAddress);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  console.log(`${members.length} emails sent!`);

  res.status(200).json({});
}
