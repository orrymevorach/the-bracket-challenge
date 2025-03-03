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
//     if (person.emailAddress !== 'coreyj_11@hotmail.com') continue;
//     try {
//       const firstName = capitalizeFirstLetter(person.firstName);
//       await transporter.sendMail({
//         from: 'The Bracket Challenge noreply@thebracketchallenge.com',
//         to: person.emailAddress,
//         subject: `Overall Rankings Are Updated!`,
//         html: `
//                   <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//                     <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//                         <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>
//                         <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>

//                         <p style="font-size: 15px; font-weight:bold">Overall rankings are live</p>
//                         <p style="font-size: 14px;">NST Duels are a wrap, and overall rankings are live! <a href="https://thebracketchallenge.com/login">Log in</a> to see how you stacked up against the competition. Did you have a weak showing in round one? Don't sweat it, there are tons of points to go around in two full days of action in Revelstoke.</p>

//                         <p style="font-size: 15px; font-weight:bold">Do overall rankings matter?</p>
//                         <p style="font-size: 14px;">HECK YES they matter! We've got tons of incredible prizes this year being awarded to our top brackets. Stay tuned for more information about prize packs, coming in the next few days.</p>

//                         <p style="font-size: 15px; font-weight:bold">What's next?</p>
//                         <p style="font-size: 14px;">For now... chill. Matchups for the next round will be announced around March 9th, and we will email you right away with a reminder to set your picks. Make sure to make your picks as soon as you can, there will be a really tight window between the announcement and the start of the competition.</p>

//                         <p style="font-size: 15px; font-weight:bold">Where can I watch Duels?</p>
//                         <p style="font-size: 14px;">If you missed the action, be sure to check them out on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-snowboard/natural-selection-tour-duels-2025">Red Bull TV</a>. Not only were there some absolute BANGERS, but it's a good opportunity to do some scouting for your Revelstoke picks.</p>

//                     </div>
//                   </div>
//                   `,
//       });
//       console.log('Email sent to', person.emailAddress);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
//   //   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
