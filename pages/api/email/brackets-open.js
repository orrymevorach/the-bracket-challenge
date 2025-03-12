// import { getAllRecords } from '@/lib/firebase-utils';
// let nodemailer = require('nodemailer');

// function capitalizeFirstLetter(word) {
//   if (!word) return ''; // Handle empty input
//   return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// }

// export default async function handler(req, res) {
//   const members = await getAllRecords('members');

//   let transporter = nodemailer.createTransport({
//     host: 'smtp.mailgun.org',
//     port: 587,
//     auth: {
//       user: process.env.MAILGUN_USER,
//       pass: process.env.MAILGUN_SMTP_PASSWORD,
//     },
//   });

//   for (let person of members) {
//     // if (
//     //   person.emailAddress !== 'coreyj_11@hotmail.com' &&
//     //   person.emailAddress !== 'orry.mevorach@gmail.com'
//     // )
//     //   continue;
//     try {
//       const firstName = capitalizeFirstLetter(person.firstName);
//       await transporter.sendMail({
//         from: 'The Bracket Challenge noreply@thebracketchallenge.com',
//         to: person.emailAddress,
//         subject: `Revelstoke Brackets Are Open!`,
//         html: `
//                     <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//                       <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//                           <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>
//                           <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>

//                           <p style="font-size: 15px; font-weight:bold">Revelstoke Brackets Are Open!</p>
//                           <p style="font-size: 14px;"><a href="https://thebracketchallenge.com/">Log in</a> to The Bracket Challenge website to make your picks for the second round of NST Snow 2025.</p>
//                           <p style="font-size: 14px;">Brackets will close the minute that the next round begins, so get your picks in ASAP!</p>

//                           <p style="font-size: 15px; font-weight:bold">In Case You Missed It: Change to NST Snow Contest Format</p>
//                           <p style="font-size: 14px;">If you missed our earlier update, NST has changed the format for the second round.</p>
//                           <p style="font-size: 14px;">Instead of selecting a winner for each matchup, you will select 4 riders from each of the 3 heats who you think will advance to the final round.</p>
//                           <p style="font-size: 14px;">Here are the rules for the new format:</p>
//                           <ol>
//                             <li style="font-size: 14px;">The second round will no longer be a head-to-head matchup system.</li>
//                             <li style="font-size: 14px;">There will be 2 men's heats with 8 riders and 1 women's heat with 8 riders. Every snowboarder will have 2 runs in each heat.</li>
//                             <li style="font-size: 14px;">After the first runs are done, the top 2 scoring riders of each heat will automatically advance to the finals.</li>
//                             <li style="font-size: 14px;">The final 6 riders in each heat will compete against each other for the 2 remaining spots in round 3.</li>
//                             <li style="font-size: 14px;">The third and final round, which will be on a separate day, will go back to the classic bracket format.</li>
//                           </ol>

//                           <p style="font-size: 15px; font-weight:bold">Contest Date</p>
//                           <p style="font-size: 14px;">Round two is likely to run on either Thursday or Friday. depending on weather predictions.</p>

//                       </div>
//                     </div>
//                     `,
//       });
//       console.log('Email sent to', person.emailAddress);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
