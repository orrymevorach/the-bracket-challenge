// import {
//   getAllRecords,
//   getRecord,
//   getUser,
//   getUserByUid,
// } from '@/lib/firebase-utils';
// import { TABLES } from '@/utils/constants';
// let nodemailer = require('nodemailer');

// function capitalizeFirstLetter(word) {
//   if (!word) return ''; // Handle empty input
//   return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// }

// export default async function handler(req, res) {
//   //   const members = await getAllRecords('members');
//   const brackets = await getAllRecords(TABLES.BRACKETS);
//   let manual = [
//     'cayleyalger@gmail.com',
//     'owen.sellers9@gmail.com',
//     'ashleyzarb27@gmail.com',
//     'samr733@gmail.com',
//     'mike.eichorn@gmail.com',
//     'jeff@baldface.com',
//     'brandonkawashima11@gmail.com',
//     'brockhunt8@gmail.com',
//     'baconsnowboards@gmail.com',
//     'masonjrichard25@gmail.com',
//     'keren.mevorach@gmail.com',
//     'jourdain.miller@gmail.com',
//     'hornig.andrew@gmail.com',
//     'odayton@gmail.com',
//     'rob@mhgsales.ca',
//     'mlipuma1@gmail.com',
//     'bayley37douglas@gmail.com',
//     'colin.wehrhan@gmail.com',
//     'turczyndaniel@gmail.com',
//     'benmincks@gmail.com',
//     'tonylefroy@gmail.com',
//     'baconsnowboards@gmail.com',
//     'jgoldb8@gmail.com',
//   ];

//   let noSelections = [];
//   for (let bracket of brackets) {
//     const selections = bracket.selections;
//     if (!selections) {
//       noSelections.push(bracket.memberId[0]);
//     }
//   }

//   const emailList = [];
//   const errorList = [];
//   for (let memberId of noSelections) {
//     const member = await getUser({
//       id: memberId,
//     });

//     if (member) {
//       const email = member.emailAddress;
//       manual.push(email);
//     }
//   }

//   let transporter = nodemailer.createTransport({
//     host: 'smtp.mailgun.org',
//     port: 587,
//     auth: {
//       user: process.env.MAILGUN_USER,
//       pass: process.env.MAILGUN_SMTP_PASSWORD,
//     },
//   });

//   for (let emailAddress of manual) {
//     try {
//       await transporter.sendMail({
//         from: 'The Bracket Challenge noreply@thebracketchallenge.com',
//         to: emailAddress,
//         subject: `Reminder - Revelstoke Brackets Are Open!`,
//         html: `
//                   <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//                       <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//                           <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>
//                           <p style="text-transform: capitalize; font-size: 14px;">Hey!</p>

//                           <p style="font-size: 15px; font-weight:bold">Reminder: Revelstoke Brackets Are Open!</p>
//                           <p style="font-size: 14px;">We noticed you have a bracket that does not have any picks yet! We wanted to remind you to get your picks in before the Revelstoke Qualifiers kick off later this week.</p>
//                           <p style="font-size: 14px;">We found an issue on our website that stopped certain people from submitting picks. If that happened to you, we sincerely apologize 🙏🏻. Everything is sorted out now.</p>

//                           <p style="font-size: 14px;"><a href="https://thebracketchallenge.com/">Log in</a> to The Bracket Challenge website to make your picks for Revelstoke Qualifiers.</p>

//                       </div>
//                   </div>
//                   `,
//       });
//       console.log('Email sent to', emailAddress);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
//   console.log(`${manual.length} emails sent!`);

//   res.status(200).json({});
// }
