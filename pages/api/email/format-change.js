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
    try {
      const firstName = capitalizeFirstLetter(person.firstName);
      await transporter.sendMail({
        from: 'The Bracket Challenge noreply@thebracketchallenge.com',
        to: person.emailAddress,
        subject: `Updates After NST Opening Ceremonies`,
        html: `
                    <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
                      <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
                          <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>
                          <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
                          <p style="font-size: 14px;">Last night we attended the NST Snow Opening Ceremonies, and we got hit with a huge curve ball, when we learned live in person that round 2 will run COMPLETELY differently than it ever has before.</p>
                          <p style="font-size: 14px;">Here is exactly what you'll need to know:</p>

                          <p style="font-size: 15px; font-weight:bold">Format Update</p>
                          <ol>
                            <li style="font-size: 14px;">The second round will no longer be a head-to-head matchup system. And that's ok!</li>
                            <li style="font-size: 14px;">There will be 2 men's heats with 8 riders and 1 women's heat with 8 riders. Every snowboarder will have 2 runs in each heat.</li>
                            <li style="font-size: 14px;">After the first runs are done, the top 2 scoring riders of each heat will automatically advance to the finals.</li>
                            <li style="font-size: 14px;">The final 6 riders in each heat will compete against each other for the 2 remaining spots in round 3.</li>
                            <li style="font-size: 14px;">The third and final round, which will be on a separate day, will go back to the classic bracket format.</li>
                          </ol>
                          <p style="font-size: 15px; font-weight:bold">Website Update</p>
                          <p style="font-size: 14px;">We have been working through the night to have the website ready with the new format, and plan to open 2nd round selections at some point today. We will let you know as soon as we open it up!</p>

                          <p style="font-size: 15px; font-weight:bold">Contest Date</p>
                          <p style="font-size: 14px;">The Revelstoke rumor mill says that the contest will run Thursday or Friday, though most likely on Friday based on weather predictions.</p>
                          <p style="font-size: 14px;">Stay tuned, and thanks for your patience!</p>
                            <p style="font-size: 15px; font-weight:bold">The Bracket Challenge</p>
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
