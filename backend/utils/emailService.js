const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendBookingConfirmation = async (user, workshop, booking) => {
  const mailOptions = {
    from: 'MechCompare <no-reply@mechcompare.com>',
    to: user.email,
    subject: 'Your booking confirmation',
    text: `Hello ${user.name},\n\nYour booking at ${workshop.name} for ${booking.service.name} on ${booking.scheduledDate} has been confirmed.\n\nThank you for using MechCompare!`,
    html: `<p>Hello ${user.name},</p><p>Your booking at ${workshop.name} for ${booking.service.name} on ${booking.scheduledDate} has been confirmed.</p><p>Thank you for using MechCompare!</p>`
  };

  await transporter.sendMail(mailOptions);
};