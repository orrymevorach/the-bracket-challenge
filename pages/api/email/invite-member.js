let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  const { email, admin, leagueId } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: 'The Bracket Challenge noreply@nstbracketchallenge.com',
    to: email,
    subject: 'Invitation to Join The Bracket Challenge!',
    html: `
    <div>
      <p>${admin} has invited you to join the The Bracket Challenge!</p>
      <p>Follow these steps to join:</p>
      <ol>
      <li>Go to <a href="https://www.nstbracketchallenge.com">www.nstbracketchallenge.com</a></li>
      <li>Create an account, or log in to your existing account if you already have one</li>
      <li>On your team dashboard, click "Join League", and enter <span style="font-style:italic;">${leagueId}</span></li>
      <li>Create a new bracket, select a winner for each matchup, and submit your picks</li>
      <li>Don't forget to check back in to make your picks when matchups are announced for Revelstoke and Selkirk!</li>
      </ol>
    </div>
    `,
  });

  res.status(200).json({});
}
