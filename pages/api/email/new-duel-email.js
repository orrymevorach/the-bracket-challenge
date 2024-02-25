const { getAllMembersWithLeagueData } = require('../../../lib/airtable');
let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  const members = await getAllMembersWithLeagueData();

  //   let transporter = nodemailer.createTransport({
  //     host: 'smtp.mailgun.org',
  //     port: 587,
  //     auth: {
  //       user: process.env.MAILGUN_USER,
  //       pass: process.env.MAILGUN_SMTP_PASSWORD,
  //     },
  //   });

  for (let person of members) {
    // console.log(person.emailAddress);
    // await transporter.sendMail({
    //   from: 'NST Bracket Challenge noreply@nstbracketchallenge.com',
    //   to: person.emailAddress,
    //   subject: `Pick your last Duels matchup! Raibu vs. Torgeir`,
    //   html: `
    //   <div style="font-size: 14px; background-color: #2f2f2f; width: 100%; padding: 10px;">
    //     <div style="background-color: white; padding: 25px; width: 600px; margin: 0 auto;">
    //       <h1 style="text-transform: capitalize; margin-bottom: 25px; font-size: 24px;">NST Bracket Challenge</h1>
    //       <h2 style="font-size: 20px;">Raibu Katayama vs. Torgeir Bergrem</h2>
    //       <p style="font-size: 14px;">We just dropped the final Duels matchup on our website!</p>
    //       <p style="font-size: 14px;">Log in to your account and make the final pick before Duels drop on Feb 27th!</p>
    //       <img src="https://nstbracketchallenge.com/_ipx/w_1080,q_75/%2F_next%2Fstatic%2Fmedia%2Ftorgier-vs-raibu.2967426d.jpeg?url=%2F_next%2Fstatic%2Fmedia%2Ftorgier-vs-raibu.2967426d.jpeg&w=1080&q=75" alt="" style="width:150px;height:auto;" />
    //     </div>
    //   </div>
    //   `,
    // });
  }
  console.log(`${members.length} emails sent!`);

  res.status(200).json({});
}
