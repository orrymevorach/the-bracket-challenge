// const { getAllMembersWithLeagueData } = require('../../../lib/airtable');
// let nodemailer = require('nodemailer');

// export default async function handler(req, res) {
//   const members = await getAllMembersWithLeagueData();
//   // const members = [
//   //   {
//   //     name: 'Orry mevorach',
//   //     emailAddress: 'orry.mevorach@gmail.com',
//   //   },
//   // ];

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
//       from: 'The Bracket Challenge noreply@thebracketchallenge.com',
//       to: person.emailAddress,
//       subject: `Last Chance To Submit Your Picks - Revelstoke Starts at 12:00PM PST!`,
//       html: `
//       <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//         <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//             <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">The Bracket Challenge</h1>
//             <h2 style="font-size: 20px;">Last Chance To Submit Your Picks! Revelstoke Starts at 12:00PM PST!</h2>
//             <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
//             <p style="font-size: 14px;">Round 2 of Natural Selection in Revelstoke kicks off today at 12:00PM PST.</p>
//             <p style="font-size: 14px;">We will be closing the Revelstoke brackets at 12:00PM PST. Make sure to <a href="https://thebracketchallenge.com/dashboard">login</a> and fill out your bracket before then!</p>
//             <p style="font-size: 14px;">You can stream the second round of Natural Selection tomorrow live on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-revelstoke">Red Bull TV.</a></p>
//         </div>
//       </div>
//       `,
//     });
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
