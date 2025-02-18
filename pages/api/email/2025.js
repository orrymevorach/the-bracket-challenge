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
//         subject: `Updates from The Bracket Challenge, 2025!`,
//         html: `
//             <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//               <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//                   <img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;margin: 0 auto 40px; display: block;" alt="The Bracket Challenge Logo"/>
//                   <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
//                   <p style="font-size: 14px;">Welcome to The Bracket Challenge 2025! We are so stoked you have joined, and we want to share some updates with you:</p>
//                   <p style="font-size: 15px; font-weight:bold">Complete your Duels bracket</p>
//                   <p style="font-size: 14px;">Duels brackets are live! We have revamped our website, so everything is faster and more beautiful than last year. Create a league with your friends, or join our Public League which is open to everyone. <a href="https://thebracketchallenge.com/login">Click here</a> to sign in to your account and get started.</p>
//                   <p style="font-size: 15px; font-weight:bold">Prizes, prizes, and more epic prizes</p>
//                   <p style="font-size: 14px;">We have partnered with the biggest brands in snowboarding, who have provided some seriously epic prizes. In order to be eligible to win, join our Public League and create a bracket. If your bracket is one of the top scoring brackets, you will win some prizes! Follow us at <a href="https://www.instagram.com/the_bracketchallenge/">@the_bracketchallenge</a> for upcoming updates on our prize packs.</p>
//                   <p style="font-size: 15px; font-weight:bold">Contest giveaway</p>
//                   <p style="font-size: 14px;">We are giving away a free K2 Antidote snowboard! Follow these instructions for a chance to win:</p>
//                   <ol>
//                     <li style="font-size: 14px;">Must be following <a href="https://www.instagram.com/the_bracketchallenge/">@the_bracketchallenge</a></li>
//                     <li style="font-size: 14px;">Like <a href="https://www.instagram.com/p/DFxyS_nP6Oh/?img_index=1">this post</a></li>
//                     <li style="font-size: 14px;">Tag your riding buddies (more comments = more entries)</li>
//                     <li style="font-size: 14px;">Create a bracket for The Bracket Challenge</li>
//                     <li style="font-size: 14px;">Bonus entries: Share this post to your story and tag us <a href="https://www.instagram.com/the_bracketchallenge/">@the_bracketchallenge</a> for 5 additional entries.</li>
//                   </ol>
//               </div>
//             </div>
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
