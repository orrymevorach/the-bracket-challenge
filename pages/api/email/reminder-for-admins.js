const { getAllMembersWithLeagueData } = require('../../../lib/airtable');
let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // const members = await getAllMembersWithLeagueData();
  // const filtered = members.filter(({ adminLeagues, brackets }) => {
  //   // League admin with bracket
  //   if (adminLeagues.length !== 0 && brackets.length !== 0) return true;
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
  //   from: 'NST Bracket Challenge noreply@nstbracketchallenge.com',
  //   to: person.emailAddress,
  //   subject: `Less than 1 week to Invite Your Friends!`,
  //   html: `
  //   <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
  //     <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
  //         <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">NST Bracket Challenge</h1>
  //         <h2 style="font-size: 20px;">NST Duels drop in only 6 days!</h2>
  //         <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
  //         <p style="font-size: 14px;">We are so stoked that you have created the league <span style="font-style: italic">${person.leagues[0].name}</span> to challenge your friends!</p>
  //         <p style="font-size: 14px;">Natural Selection Duels drops on Feb 27 (only 6 days away), so we wanted to send you a gentle reminder to invite your friends to create brackets before it's too late!</p>
  //         <p style="font-size: 14px;">There are 2 ways to invite your friends:</p>
  //         <ol>
  //             <li>Go to your <a href="https://nstbracketchallenge.com/league/${person.leagues[0].id}?leagueId=${person.leagues[0].id}">league page,</a> click <span style="font-style: italic">Invite Member</span>, and enter in your friends emails.</li>
  //             <li>Or, copy your league id - <span style="font-style: italic">${person.leagues[0].id}</span> - text it to you friends, and tell them to join the league through their dashboard.</li>
  //         </ol>

  //         <h3 style="font-size: 18px;"">Join The NST Open</h3>
  //         <p style="font-size: 14px;">Want to earn extra bragging rights?</p>
  //         <p style="font-size: 14px;"><a href="https://nstbracketchallenge.com/dashboard">Join The NST Open!</a> We have opened a public league for anyone that wants to prove they know their sh*t</p>
  //     </div>
  //   </div>
  //   `,
  // });
  // }
  // console.log(`${filtered.length} emails sent!`);

  res.status(200).json({});
}
