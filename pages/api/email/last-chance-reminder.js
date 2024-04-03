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
//       from: 'NST Bracket Challenge noreply@nstbracketchallenge.com',
//       to: person.emailAddress,
//       subject: `Last Chance To Make Your Picks For The Final Round!`,
//       html: `
//       <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//         <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//             <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">NST Bracket Challenge</h1>
//             <h2 style="font-size: 20px;">Last Chance To Make Your Picks For The Final Round!</h2>
//             <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
//             <p style="font-size: 14px;">Round 3 of Natural Selection in Selkirk Tangiers kicks off tomorrow at 10:00AM PST.</p>
//             <p style="font-size: 14px;">In this final round, there are 16 total points up for grabs, which means it's still anyone's game!</p>
//             <p style="font-size: 14px;">Make sure to <a href="https://nstbracketchallenge.com/dashboard">login</a> and make your picks before it's too late!</p>
//             <p style="font-size: 14px;">You can stream the event live for free tomorrow on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-revelstoke">Red Bull TV.</a></p>
//         </div>
//       </div>
//       `,
//     });
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
