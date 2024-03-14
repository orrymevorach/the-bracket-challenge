// const { getAllMembersWithLeagueData } = require('../../../lib/airtable');
// let nodemailer = require('nodemailer');

// export default async function handler(req, res) {
//   const members = await getAllMembersWithLeagueData();
//   //   const members = [
//   //     {
//   //       name: 'Orry mevorach',
//   //       emailAddress: 'orry.mevorach@gmail.com',
//   //     },
//   //   ];

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
//       subject: `Make Your Picks For The Final Round!`,
//       html: `
//       <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//         <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//             <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">NST Bracket Challenge</h1>
//             <h2 style="font-size: 20px;">Make Your Picks For The Final Round!</h2>
//             <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
//             <p style="font-size: 14px;">How EPIC was that?? The riders put on an absolute show in Revelstoke this afternoon, with 12 of the 24 riders moving onto the final bracket. With round 2 now under our belts, the riders look to the Final Round in Selkirk Tangiers.</p>
//             <p style="font-size: 14px;">The Selkirk brackets are now open, make sure to <a href="https://nstbracketchallenge.com/dashboard">login</a> and make your picks!</p>
//             <p style="font-size: 14px;">For those who missed the event today, you can stream it for free on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-revelstoke">Red Bull TV.</a></p>
//         </div>
//       </div>
//       `,
//     });
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
