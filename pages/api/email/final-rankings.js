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
//     try {
//       const firstName = capitalizeFirstLetter(person.firstName);
//       await transporter.sendMail({
//         from: 'The Bracket Challenge noreply@thebracketchallenge.com',
//         to: person.emailAddress,
//         subject: `Final Bracket Rankings Are Live!`,
//         html: `
//                 <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//                     <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//                         <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>
//                         <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName},</p>
//                         <p style="font-size: 15px;font-weight:bold;">Final Bracket Rankings Are Live!</p>
//                         <p style="font-size: 14px;">Revelstoke Finals have wrapped up, and bracket rankings are live!</p>
//                         <p>Did you win a sick prize pack? Did you earn bragging rights against your friends?</p>
//                         <p style="font-size: 14px;"><a href="https://thebracketchallenge.com/">Log in</a> and check how your bracket stacked up against the competition!</p>
//                         <p style="font-size: 14px;">If you missed the action, make sure to stream on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-snowboard">Red Bull TV.</a> It was beyond epic, and you don't want to miss it!</p>
//                     </div>
//                 </div>
//             `,
//       });
//       console.log('Email sent to', person.emailAddress);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
