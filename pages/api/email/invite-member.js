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
    from: 'NST Bracket Challenge noreply@nstbracketchallenge.com',
    to: email,
    subject: 'Invitation to Join Natural Selection Tour Bracket Challenge!',
    html: `
    <div>
      <p>${admin} has invited you to join the Natural Selection Tour Bracket Challenge!</p>
      <p>Follow these steps to join:</p>
      <ol>
      <li>Go to <a href="https://www.nstbracketchallenge.com">www.nstbracketchallenge.com</a></li>
      <li>Create an account, or log in to your existing account if you already have one</li>
      <li>On your team dashboard, click "Join League", and enter the following league ID</li>
      <li>Create a new bracket, or use an existing bracket, making sure you have selected a winner for each round of the Natural Selection Tour</li>
      </ol>
      <p>League ID: ${leagueId}</p>
    </div>
    `,
  });

  res.status(200).json({});
}
