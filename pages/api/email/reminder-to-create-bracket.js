import { topDawgCompetitionLeagueId } from '@/utils/constants';
const { getAllMembersWithLeagueData } = require('../../../lib/airtable');
let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // const members = await getAllMembersWithLeagueData();
  // const filtered = members.filter(({ leagues, brackets }) => {
  //   // Yes league, no bracket
  //   if (leagues.length > 0 && brackets.length === 0) return true;
  //   return false;
  // });

  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.mailgun.org',
  //   port: 587,
  //   auth: {
  //     user: process.env.MAILGUN_USER,
  //     pass: process.env.MAILGUN_SMTP_PASSWORD,
  //   },
  // });

  // for (let person of filtered) {
  //   console.log(person.emailAddress);
  //   const firstName = person.name.split(' ')[0];
  // await transporter.sendMail({
  //   from: 'The Bracket Challenge noreply@thebracketchallenge.com',
  //   to: person.emailAddress,
  //   subject: `Less than 1 week to Create Your Bracket!`,
  //   html: `
  //   <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
  //     <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
  //       <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">The Bracket Challenge</h1>
  //       <h2 style="font-size: 20px;">NST Duels drop in only 6 days!</h2>
  //       <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
  //       <p style="font-size: 14px;">We are so stoked you joined the league <span style="font-style: italic;">${person.leagues[0].name}</span>! We noticed you have not yet created a bracket, so we wanted to send you a gentle reminder.</p>
  //       <p style="font-size: 14px;">Natural Selection Duels drops on Feb 27 (only 6 days away). Make sure to <a href="https://thebracketchallenge.com/league/${person.leagues[0].id}?leagueId=${person.leagues[0].id}">create your bracket</a> before it's too late!</p>
  //       <h3 style="font-size: 18px;"">Join The NST Open</h3>
  //       <p style="font-size: 14px;">We have opened a public league for anyone that wants to prove they know their sh*t</p>
  //       <p style="font-size: 14px;">Want to earn extra bragging rights? Open <a href="https://thebracketchallenge.com/dashboard">your dashboard</a> and join The NST Open!</p>

  //     </div>

  //   </div>
  //   `,
  // });
  // }
  // console.log(`${filtered.length} emails sent!`);

  res.status(200).json({});
}
