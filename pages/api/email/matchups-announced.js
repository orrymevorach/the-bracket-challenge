// const { getAllMembersWithLeagueData } = require('../../../lib/airtable');
// let nodemailer = require('nodemailer');

// export default async function handler(req, res) {
//   const members = await getAllMembersWithLeagueData();

//   let transporter = nodemailer.createTransport({
//     host: 'smtp.mailgun.org',
//     port: 587,
//     auth: {
//       user: process.env.MAILGUN_USER,
//       pass: process.env.MAILGUN_SMTP_PASSWORD,
//     },
//   });

//   for (let person of members) {
//     const firstName = person.name.split(' ')[0];
//     console.log(firstName, person.emailAddress);
//     await transporter.sendMail({
//       from: 'The Bracket Challenge noreply@nstbracketchallenge.com',
//       to: person.emailAddress,
//       subject: `Time To Make Your Picks! Revelstoke Matchups Have Been Announced!`,
//       html: `
//       <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//         <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//             <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">The Bracket Challenge</h1>
//             <h2 style="font-size: 20px;">Time To Make Your Picks - Revelstoke Matchups Have Been Announced!</h2>
//             <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
//             <p style="font-size: 14px;">Matchups for Revelstoke have been announced, and it's time to complete the second round of your bracket!</p>
//             <p style="font-size: 14px;"><a href="https://nstbracketchallenge.com/dashboard">Login</a> to your dashboard to view your brackets and make your picks for the next round!</p>
//         </div>
//       </div>
//       `,
//     });
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
