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
//       subject: `Updated Rankings are LIVE!`,
//       html: `
//       <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//         <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//             <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">The Bracket Challenge</h1>
//             <h2 style="font-size: 20px;">Updated Rankings are LIVE!</h2>
//             <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
//             <p style="font-size: 14px;">Now that all the Duels have dropped, check out how your bracket stacks up against the competition!</p>
//             <p style="font-size: 14px;">In case you haven't had a chance to watch Duels, you can stream them on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-revelstoke">Red Bull TV.</a></p>
//             <h3 style="font-size: 16px;">Not doing so hot in your league standings?</h3>
//             <p style="font-size: 14px;">Not to worry, there are still tons of points up for grabs in the next 2 rounds of competition!</p>
//             <h3 style="font-size: 18px;"">When will Revelstoke and Selkirk matchups be announced?</h3>
//             <p style="font-size: 14px;">We expect Natural Selection to announce the matchups in the next few days. As soon as they do, brackets will open for you to make your picks.</p>
//             <p style="font-size: 14px;">Be sure to follow our <a href="https://www.instagram.com/nstbracketchallenge/">instagram page</a> for live updates!</p>
//         </div>
//       </div>
//       `,
//     });
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
