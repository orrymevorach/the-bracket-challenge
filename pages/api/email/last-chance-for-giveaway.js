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
//           await transporter.sendMail({
//             from: 'The Bracket Challenge noreply@thebracketchallenge.com',
//             to: person.emailAddress,
//             subject: `Free K2 Snowboard Giveaway Ends at Midnight!`,
//             html: `
//                 <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
//                   <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
//                       <a href="https://thebracketchallenge.com" style="width:300px;margin: 0 auto 40px; display: block;"><img src="https://thebracketchallenge.com/logo-center.png" style="width:300px;" alt="The Bracket Challenge Logo"/></a>    
//                       <p style="text-transform: capitalize; font-size: 14px;">Hey ${firstName}!</p>
                      
//                       <p style="font-size: 15px; font-weight:bold">Contest giveaway ends at midnight</p>
//                       <p style="font-size: 14px;">We are giving away a free K2 Antidote snowboard! Follow these instructions for a chance to win:</p>
//                       <ol>
//                         <li style="font-size: 14px;">Must be following <a href="https://www.instagram.com/the_bracketchallenge/">@the_bracketchallenge</a></li>
//                         <li style="font-size: 14px;">Like <a href="https://www.instagram.com/p/DFxyS_nP6Oh/?img_index=1">this post</a></li>
//                         <li style="font-size: 14px;">Tag your riding buddies (more comments = more entries)</li>
//                         <li style="font-size: 14px;">Create a bracket for <a href="https://thebracketchallenge.com">The Bracket Challenge</a></li>
//                         <li style="font-size: 14px;">Bonus entries: Share this post to your story and tag us <a href="https://www.instagram.com/the_bracketchallenge/">@the_bracketchallenge</a> for 5 additional entries.</li>
//                       </ol>
//                       <p style="font-size: 15px; font-weight:bold">About the K2 Antidote Unisex Snowboard 2025</p>
//                       <p style="font-size: 14px;">This all mountain freestyle piece of artillery is an all around tank. Whether you’re riding in pow or blasting side hits get ready for an all around good time.</p>
//                       <p style="font-size: 14px;">The antidote is the weapon of choice for Sage Kotsenburg during the NST Snow event. The Colonel himself swears by this snowboard for the biggest airs in the deepest of days.</p>
//                       <div style="display:flex;align-items:center;justify-content:center;">
//                         <img src="https://cdn.media.amplience.net/i/k2/k2snow_2425_antidote_KB240303_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=144" style="width:200px;"/>
//                         <img src="https://cdn.media.amplience.net/i/k2/k2snow_2425_antidote_KB240303_2?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=144" style="width:200px;"/>
//                       </div>
                      
                      
//                   </div>
//                 </div>
//                 `,
//           });
//           console.log('Email sent to', person.emailAddress);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
//   console.log(`${members.length} emails sent!`);

//   res.status(200).json({});
// }
