const nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendEmail = async badge => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SEND_ID,
      pass: process.env.SEND_PW,
    }
  })

  const to = [process.env.TO_ID]

  const mailOptions = {
    from: process.env.GMAIL_ID,
    to,
    subject: '새로운 solved.ac 뱃지!',
    html: `<img alt="${badge.displayName}" width="120" height="120" src="${badge.badgeImageUrl}" style="color: transparent;"><p>${badge.displayDescription}</p>`
  }

  const info = await transporter.sendMail(mailOptions).catch(e => console.log(e))
  console.log('Email sent: ' + info.response)
}