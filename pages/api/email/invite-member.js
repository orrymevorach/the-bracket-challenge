let nodemailer = require('nodemailer');
import { updateRecord } from '@/lib/firebase-utils';

export default async function handler(req, res) {
  const { email, admin, leagueId, invitations, sport } = {
    ...req.body,
    ...req.query,
  };
  try {
    const filteredInvitations = invitations.filter(
      invitation => invitation.email !== email
    );

    // Add new email to array, and stringify invitations
    const invitationsWithUserEmail = [
      ...filteredInvitations,
      { email, status: 'pending' },
    ];

    // Add the updated invitations to the league record
    await updateRecord({
      tableId: 'Leagues',
      recordId: leagueId,
      newFields: {
        invitations: invitationsWithUserEmail,
      },
    });

    // Send an email invitation to the new invite
    let transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: 'The Bracket Challenge noreply@thebracketchallenge.com',
      to: email,
      subject: `Invitation to Join The Bracket Challenge`,
      html: `
      <div style="text-align:center;width:500px;margin:0 auto;">
        <p style="font-size:20px;">${admin} has invited you to join The Bracket Challenge, ${sport.toUpperCase()}</p>
        <p><a href="https://thebracketchallenge.com/login?leagueId=${leagueId}" style="display: block; margin: 0 auto; color:white; background-color:#7bc9ab; border:none; padding:16px 0 14px; font-size:16px; border-radius:15px; width:150px; cursor:pointer; text-decoration: none; font-weight: bold;">Join Now</a></p>
        <p>Or follow these steps:</p>
          <ol>
            <li style="text-align:left;">Go to <a href="https://www.thebracketchallenge.com/login">The Bracket Challenge</a></li>
            <li style="text-align:left;">Create an account, or log in to your existing account if you already have one</li>
            <li style="text-align:left;">On your dashboard, click "Join League", and enter <span style="font-style:italic;">${leagueId}</span></li>
          </ol>
      </div>
      `,
    });

    res.status(200).json({ invitations: invitationsWithUserEmail });
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json(error);
  }
}
