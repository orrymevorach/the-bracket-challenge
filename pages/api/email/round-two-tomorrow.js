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
//         subject: `Last Chance To Submit Your Picks - Brackets Close Tomorrow at 12:30PM`,
//         html: `
//               <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//                   <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//                       <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>
//                       <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
//                       <p style="font-size: 15px;font-weight:bold;">Brackets are closing tomorrow at 12:30PM PST - Last Chance To Submit Your Picks!</p>
//                       <p style="font-size: 14px;">Tomorrow's schedule:</p>
//                       <ul>
//                             <li style="font-size: 14px;">12:30PM PST: Brackets Close</li>
//                             <li style="font-size: 14px;">1:00PM PST: Revelstoke Qualifiers begin</li>
//                             <li style="font-size: 14px;">7:00PM PST: Revelstoke Finals Day Brackets Open</li>
//                       </ul>
//                       <p style="font-size: 14px;">Make sure to <a href="https://thebracketchallenge.com/">log in</a> and fill out your bracket!</p>
//                       <p style="font-size: 14px;">You can stream the second round of Natural Selection live on <a href="https://www.redbull.com/int-en/events/natural-selection-tour-snowboard">Red Bull TV.</a></p>
//                       <p style="font-size: 15px;font-weight:bold;">Revelstoke Finals Day Schedule Update</p>
//                       <p style="font-size: 14px;">It is looking like Revelstoke Finals will run on Saturday, starting in the morning.</p>
//                       <p style="font-size: 14px;">The window to make your picks between the Qualifying Round and the Finals Round is small. Make sure to get your picks in on time!</p>
//                       <p style="font-size: 14px;">We will send email updates as we find out more.</p>

//                   </div>
//               </div>
//           `,
//       });
//       console.log('Email sent to', person.emailAddress);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
